const db = require('../../core/server/database/db');

exports.dajGradove = () => {
    return db.grad.findAll({raw: true});
}

exports.dajGrad = (id) => {
    return db.grad.findOne({ where:{id}});
}

exports.dodajGrad = (grad) => {
    return db.grad.create(grad);
}

exports.updateGrad = (id, grad) => {
    return db.grad.update(
        { naziv: grad.naziv, broj_stanovnika: grad.brojStanovnika },
        { where: { id: id } }
    )
}

exports.obrisiGrad = (id) => {
    return db.grad.destroy({
        where: {
            id: id
        }
    })
}
