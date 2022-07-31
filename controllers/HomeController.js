exports.HomeController = {
    index: (req, res) => {
        res.sendFile(process.env.VIEWS_PATH + 'index.html')
    }
}