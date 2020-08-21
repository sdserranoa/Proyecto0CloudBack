var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:postgres@localhost:5432/postgres");

/*EVENTS*/
const getEventList = (callback) => {
    db.any("SELECT * FROM public.events")
        .then(function (data) {
            console.log("DATA:", data);
            callback(data)
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
}

const getEvent = (callback, eventN, eventA, eventD) => {
    db.one('SELECT id, event_name, event_category, event_place, event_address, event_initial_date, event_final_date, event_type, thumbnail FROM public.events WHERE event_Name = $1 AND event_address = $2 AND event_initial_date = $3', [eventN, eventA, eventD])
        .then(data => {
            callback(data)
        })
        .catch(error => {
            console.log("ERROR:", error)
        })
}

const getEventById = (callback, id) => {
    db.one('SELECT * FROM public.events WHERE id = $1',id)
        .then(data=>{
            callback(data)
        })
        .catch(error => {
            console.log("ERROR:", error)
        })
}

const insertEvent = (callback, event, event_creator) => {
    db.none('INSERT INTO public.events(event_name, event_category, event_place, event_address, event_initial_date, event_final_date, event_type, thumbnail, event_creator)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);', [event.event_name, event.event_category, event.event_place, event.event_address, event.event_initial_date, event.event_final_date, event.event_type, event.thumbnail, event_creator])
        .then(() => {
            getEvent(callback,event.event_name, event.event_address, event.event_initial_date)
        })
        .catch(error => {
            console.log("ERROR:", error);
        });
}

const deleteEvent = (callback, event) => {
    db.result('DELETE FROM public.events WHERE id = $1', event)
        .then(result => {
            console.log(result.rowCount); // print how many records were deleted;
            if (result.rowCount > 0) {
                callback("El evento se ha eliminado correctamente")
            } else {
                callback("No existe el evento con el id " + event)
            }

        })
        .catch(error => {
            console.log('ERROR:', error);
        });
}

const updateEvent = (callback, event, id) => {
    db.none('UPDATE public.events SET event_name=$1, event_category=$2, event_place=$3, event_address=$4, event_initial_date=$5, event_final_date=$6, event_type=$7 WHERE id = $8;',[event.event_name, event.event_category, event.event_place, event.event_address, event.event_initial_date, event.event_final_date, event.event_type, id])
        .then(()=> {
            getEvent(callback,event.event_name,event.event_address,event.event_initial_date)
        })
        .catch(error => {
            console.log('ERROR', error)
        })
}

/*USERS*/
const getUserList = (callback) => {
    db.any("SELECT * FROM public.users")
        .then(function (data) {
            console.log("DATA:", data);
            callback(data)
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
}

const insertUser = (callback, user) => {
    db.none("INSERT INTO public.users(username, first_name, last_name, email, password)VALUES ($1, $2, $3, $4, $5);", [user.username, user.first_name, user.last_name, user.email, user.password])
        .then(function (data) {
            callback("El usuario se registró correctamente")
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
}

const getUser = (callback, username, password) => {
    db.one('SELECT * FROM public.users WHERE username = $1 AND password = $2',[username, password])
        .then(data => {
            callback(data)
        })
        .catch(error=> {
            console.log("ERROR:", error)
        })
}

exports.getEventList = getEventList
exports.insertEvent = insertEvent
exports.insertUser = insertUser
exports.getUserList = getUserList
exports.deleteEvent = deleteEvent
exports.updateEvent = updateEvent
exports.getEventById = getEventById
exports.getUser = getUser

