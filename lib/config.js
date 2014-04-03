var config = {

    // Path Config
    app_view: 'app/',
    app_style: 'app/styles/',
    app_script: 'app/scripts/',
    public_view: 'public/',
    public_style: 'public/styles/',
    public_script: 'public/scripts/',

    // Server Config
    server_host: '127.0.0.1',
    server_port: '8001',
    server_base: 'public',
    server_sync: true,
    server_files: [
        'app/styles/*.styl',
        'app/scripts/*.js',
        'public/*.html'
    ]

};

exports.config = config;
