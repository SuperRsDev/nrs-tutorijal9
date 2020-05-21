module.exports = (function() {
    const gradoviRoute = '/gradovi';
    const gradRoute = '/grad';

    return {
        gradovi: {
            bazna: gradoviRoute,
            single: gradRoute
        },
        getById: (route) => {
            return `${route}/:id`
        }
    }
}())
