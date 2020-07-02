var services = require('../controllers/medicine')

module.exports = (router) => {

    router.post('/medicine/:id', (req, res) => {
        services.create_medicine(req, res);
    })


    router.put('/medicine/update/:id', (req, res) => {
        services.update_medicine(req, res);
    })

    router.delete('/medicine/delete/:id', (req, res) => {
        services.delete_medicine(req, res);
    })

    router.get('/medicines/:id', (req, res) => {
        services.get_medicine(req, res);
    })

    router.get('/medicine/:id',(req, res) =>{
        services.get_medicine_by_id(req,res);
    })

}