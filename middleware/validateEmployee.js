function validateEmployee(req, res, next) {
    const { FullName, Rank, Salary } = req.body;
    
    if (!FullName || !Rank || !Salary) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    if (![1, 2, 3].includes(Rank)) {
        return res.status(400).json({ message: "Le champ 'rank' doit avoir une valeur de 1, 2 ou 3" });
    }

    next();
}

module.exports = validateEmployee;