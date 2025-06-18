const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../utils/auth');
const { User } = require('../models');
const ExcelJS = require('exceljs');

router.get('/', ensureAuthenticated, async (req, res) => {
  const users = await User.findAll();
  res.render('dashboard', { users });
});

router.get('/excel', ensureAuthenticated, async (req, res) => {
  const users = await User.findAll();
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Usuarios');
  sheet.columns = [
    { header: 'ID', key: 'id' },
    { header: 'Email', key: 'email' }
  ];
  users.forEach(u => sheet.addRow({ id: u.id, email: u.email }));
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="usuarios.xlsx"');
  await workbook.xlsx.write(res);
  res.end();
});

module.exports = router;
