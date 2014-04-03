var config = {

    // Path Config
    app_view: 'app/',
    app_style: 'app/css/',
    app_script: 'app/js/',
    public_view: 'public/',
    public_style: 'public/css/',
    public_script: 'public/js/',

    // Server Config
    server_host: '127.0.0.1',
    server_port: '8001',
    server_base: 'public',
    server_sync: true,
    server_files: [
        'app/css/*.styl',
        'app/js/*.js',
        'public/*.html'
    ]

};

exports.config = config;
