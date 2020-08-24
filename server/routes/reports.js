const route = require('express').Router();
const { managerPermission } = require('../auth');
const { colors } = require('../utils');
const User = require('../models/User');
const db = require('../config/db');

route.get('/', managerPermission, (req, res) => {
    const month = +req.query.month;
    const { status } = req.query;
    const resource_ids = req.query.resource_ids.split(',').map(elem => +elem);

    User.findAll({ attributes: ['id', 'name'], where: { id: resource_ids }, raw: true }).then(resources => {
        Promise.all(resources = resources.map(resource => {
            return db.query(`select mydates.mydate as date, count(tasks.id) as no_tasks from mydates
            left join tasks on mydates.mydate = tasks.creation_date and tasks.resource_id = ${resource.id}
            where month(mydates.mydate) = ${month + 1} and tasks.status='${status}' group by mydates.mydate`, { type: db.QueryTypes.SELECT }).then(data => {
                data = data.map(elem => {
                    elem.date = elem.date.split('-')[2];
                    return elem
                })
                resource.data = data;
                return resource;
            })
        })).then(resources => {
            resources.forEach((resource, index) => {
                resource.color = colors[index];
            })
            res.send(resources);
        });
    })

    // const query = `drop table if exists raport; create temporary table raport as (
    //     select users.id, users.name, mydates.mydate from users, mydates where users.id in (${resource_ids}) and month(mydates.mydate) = ${month}
    //     order by users.name, mydates.mydate);

    //     select r.*, count(t.id) as no_tasks from raport r
    //     left join tasks t on r.mydate = t.creation_date and r.id = t.resource_id
    //     where status = '${status}'
    //     group by r.id, r.name, r.mydate;`


    // db.query(query, { type: db.QueryTypes.SELECT })
    //     .then(records => {
    //         require('fs').writeFile('test.json', JSON.stringify(records), 'utf8', () => { });
    //         records = Object.values(records[2]);
    //         console.log(records);
    //         if (records.length) {
    //             const response = [{ id: records[0].id, name: records[0].name, data: [{ date: records[0].mydate.split('-')[2], no_tasks: records[0].no_tasks }] }];
    //             let currentIndex = 0;
    //             for (let i = 1; i < records.length; i++) {
    //                 if (records[i].id !== response[currentIndex].id) {
    //                     response.push({ id: records[i].id, name: records[i].name, data: [{ date: records[i].mydate.split('-')[2], no_tasks: records[i].no_tasks }] });
    //                     currentIndex++;
    //                 } else {
    //                     response[currentIndex].data.push({ date: records[i].mydate.split('-')[2], no_tasks: records[i].no_tasks });
    //                 }
    //             }
    // const colorKeys = Object.keys(Colors.names);
    // response.forEach((resource, index) => {
    //     resource.color = Colors.names[colorKeys[index]];
    // })
    //             console.log('response');
    //             res.send(response);
    //         } else {
    //             console.log('records');
    //             res.send(records);
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //         res.status(500).send({ message: 'Internal server error!' });
    //     })
})

module.exports = route;