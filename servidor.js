const express = require('express')
const {resolve} = require('path')

const app = express()

app.use('/', 
    express.static(
            resolve(
                __dirname,
                './build'
            )
        )
    )

    app.use('/Perfil', 
    express.static(
            resolve(
                __dirname,
                './build'
            )
        )
    )

    app.use('/Login', 
    express.static(
            resolve(
                __dirname,
                './build'
            )
        )
    )

    app.use('/PublicarArtigo', 
    express.static(
            resolve(
                __dirname,
                './build'
            )
        )
    )

    app.use('/PainelMestre', 
    express.static(
            resolve(
                __dirname,
                './build'
            )
        )
    )

    app.use('/DetalheArtigo/*', 
    express.static(
            resolve(
                __dirname,
                './build'
            )
        )
    )

    app.use('/EditarArtigo', 
    express.static(
            resolve(
                __dirname,
                './build'
            )
        )
    )

app .listen(process.env.PORT || 3000, (err) => {
    if(err) {
        return console.log(err)
    }

    console.log("Tudo certo com inicio express")
})