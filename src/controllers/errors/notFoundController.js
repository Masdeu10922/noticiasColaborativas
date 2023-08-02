const notFoundController = (req, res, next) => {
    res.status(404).send({
        status: 'ok',
        message: 'Ruta no encontrada',
    });
};

module.exports = notFoundController;