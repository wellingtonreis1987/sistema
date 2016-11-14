var api = {};

api.allow = function(req, res){
    var allowed = [
        { _id: 1, url: '/fotos', titulo: 'Fotos' },
    ];

    res.json(allowed);
}

module.exports = api;