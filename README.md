# ProteomicsDB - Frontend in VueJS

## Documentation
[Check this wiki](https://gitlab.lrz.de/prdb/vue-ui/proteomicsdb-vue/-/wikis/home)

## Cloning for the first time
Update the submodules
```
git submodule update --init --recursive
```

Install dependancies
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
./build.sh
```

Deploy the frontend via the [web ide](https://q01.proteomicsdb.in.tum.de/sap/hana/ide/editor/).
Create a new package or delete the old files of the vue package.
Create a `.xsapp` (empty) and a `.xsaccess` file.

Content of `.xsaccess`
```
{
    "exposed": true,
    "authentication": null,
    "prevent_xsrf": false,
    "force_ssl": false,
    "rewrite_rules": [
        {
            "source": "/(?!((css|fonts|img|js|assets).*$))(?!(favicon.ico))(^.*)",
            "target": "/index.html"
        }]
}
```


## Lints and fixes files
```
npm run lint
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
