module.exports = {
  apps : [{
    script: './AccountsMicro/index.js',
    watch: './AccountsMicro/'
  }, {
    script: './AuthMicro/index.js',
    watch: ['./AuthMicro/']
  }],
  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
