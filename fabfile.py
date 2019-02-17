# -*- coding: utf-8 -*-
"""
File usage:

fab env task_name:action

e.g.

To deploy code on production webapp
1. fab production webapp:all

"""

import os

from fabric.api import cd, env, require, roles, run, settings, sudo, task
from fabric.contrib.files import append, upload_template
import commands


env.target = None
env.user = 'azureuser'


def read_key_file(key_file):
    key_file = os.path.expanduser(key_file)
    if not key_file.endswith('pub'):
        raise RuntimeWarning('Trying to push non-public part of key pair')

    with open(key_file) as f:
        return f.read()


# Tasks
@task
def production():
    env.roledefs = {
        'webapp': [
            'ps-staging1.cloudapp.net'
        ]
    }

    #TODO: update the host names.
    env.hosts = [
        'ps-staging1.cloudapp.net'
    ]

    env.roles = env.roledefs.keys()
    env.target = 'production'
    env.git_branch = 'master'


@task
def staging():
    env.roledefs = {
        'webapp': [
            'ps-staging1.cloudapp.net'
        ]
    }

    env.hosts = [
        'ps-staging1.cloudapp.net'
    ]

    env.target = 'staging'
    env.roles = env.roledefs.keys()
    branch_name = commands.getoutput(
        "git branch | grep \* | cut -d ' ' -f2"
    ).strip()
    if branch_name.startswith("fatal: Not a git repository"):
        branch_name = 'development'

    env.git_branch = branch_name


@task
def add_key_to_authorized_keys(key_file='/tmp/id_rsa.pub'):
    key_text = read_key_file(key_file)
    append('~/.ssh/authorized_keys', key_text)
    run('sort -u -o ~/.ssh/authorized_keys ~/.ssh/authorized_keys')


@task
def add_deployer_keys(key_path='~/keys_petasense'):
    """
    Add petasense deployer keys
    """
    private_key_path = '%s/ps_deployer.pub' % key_path
    public_key_path = '%s/ps_deployer.pub' % key_path

    remote_key_paths = [
        (
            '/home/azureuser/.ssh/ps_deployer',
            '/home/azureuser/.ssh/ps_deployer.pub'
        ),
        (
            '/root/.ssh/ps_deployer',
            '/root/.ssh/ps_deployer.pub'
        )
    ]

    for private_path, public_path in remote_key_paths:
        upload_template(private_key_path, private_path, use_sudo=True)
        upload_template(public_key_path, public_path, use_sudo=True)
        run("sudo chmod 400 %s" % private_path)
        run("sudo chmod 400 %s" % public_path)


@task
def run_cmd(cmd):
    run(cmd)


@task
def uptime():
    require('target', provided_by=(staging, production,))
    run('uptime')


def deploy_webapp():
    with cd('~/repos/webapp-react'):
        run("git fetch")
        run('git status')
        run("git checkout -f %s" % env.git_branch)
        run("git pull origin %s" % env.git_branch)


def install_webapp():
    with cd('~/repos/webapp-react'):
        with settings(prompts={'Do you want to continue [Y/n]? ': 'Y'}):
            run("curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -")
            run('echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list')
            sudo("apt-get update")
            sudo("apt-get install yarn")
            run("yarn")


def build_webapp():
    #TODO: use the target from env
    with cd('~/repos/webapp-react'):
        run("yarn build") #  % env.target


def all_webapp():
    deploy_webapp()
    build_webapp()

def get_task(suffix, prefix):
    return globals()["%s_%s" % (prefix, suffix)]


@task
@roles('webapp')
def webapp(action):
    get_task('webapp', action)()

