var mongoose = require('mongoose');
var jwt  = require('jsonwebtoken'); // importando o módulo

module.exports = function(app) {

    var api = {};
    var model = mongoose.model('Usuario');

    api.autentica = function(req, res) {
        model.findOne({
                login: req.body.login,
                senha: parseInt(req.body.senha)
            })
            .then(function(usuario) {
                if (!usuario) {
                    console.log('Login/senha inválidos');
                    res.sendStatus(401);
                } else {
                    var token = jwt.sign( {login: usuario.login}, app.get('secret'), {
                        expiresIn: 86400 // valor em segundo, aqui temos um total de 24 horas
                    });
                    res.set('x-access-token', token); // adicionando token no cabeçalho de resposta
                    res.end(); // enviando a resposta
                }
            });
    };

    api.verificaToken = function(req, res, next) {

        var token = req.headers['x-access-token']; // busca o token no header da requisição

        if (token) {
            jwt.verify(token, app.get('secret'), function(err, decoded) {
                if (err) {
                    res.sendStatus(401);
                } else {
                    // guardou o valor decodificado do token na requisição. No caso, o login do usuário.
                    req.usuario = decoded;
                    next();
                }
            });
        } else {
            return res.sendStatus(401);
        }

    };

    return api;
};