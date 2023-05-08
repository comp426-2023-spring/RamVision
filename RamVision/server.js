const express = require('express')
const https = require('https')
const app = express()
const url = 'https://ramvision-ecaa0-default-rtdb.firebaseio.com/';
var port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/app', (req, res) => {
    res.status(200).send(JSON.stringify("API available.")).end();
})

app.get('/app/grades', (req, res) => {
    if (req.query.year == undefined ||
        req.query.sem == undefined ||
        req.query.major == undefined ||
        req.query.course == undefined ||
        req.query.prof == undefined ){
            res.status(422).send(JSON.stringify("Error: Invalid query parameters. Include year, semester, major, course number, and professor.")).end()
            return;
    }
    var options = {
        host: url.substring('https://'.length, url.length - 1),
        path: "/" + req.query.year + "/" + req.query.sem + "/" + req.query.major + "/" + req.query.course + "/" + req.query.prof + "/.json",
        method: 'GET'
    }
    const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
      
        response.on('end', () => {
            const body = JSON.parse(data);
            if(body == null){
                res.status(200).send(JSON.stringify("There are no grades entered for this course and professor yet!")).end()
                return;
            }
            output = []
            for (var grade in body){
                output.push(body[grade])
            }
            res.status(200).send(JSON.stringify(output)).end()
        });
    })
    request.on('error', (error) => {
        console.log('An error occured', error);
    });
    
    request.end()
});

app.post('/app/add/:year/:semester/:major/:course/:prof/:grade', (req, res) => {
    if (req.params.year == undefined ||
        req.params.semester == undefined ||
        req.params.major == undefined ||
        req.params.course == undefined ||
        req.params.prof == undefined ||
        req.params.grade == undefined){
            res.status(422).send(JSON.stringify("Error: Invalid parameters. Include year, semester, major, course number, and professor.")).end()
            return;
    }

    var options = {
        host: url.substring('https://'.length, url.length - 1),
        path: "/" + req.params.year + "/" + req.params.semester + "/" + req.params.major + "/" + req.params.course + "/" + req.params.prof + "/.json",
        method: 'POST',
    }

    const data = JSON.stringify(req.params.grade)

    const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
      
        response.on('end', () => {
            const body = JSON.parse(data);
            if(body == null){
                res.status(200).send(JSON.stringify("There are no grades entered for this course and professor yet!")).end()
                return;
            }
            res.status(200).send(JSON.stringify(body)).end()
        });
    })
      
    request.on('error', (error) => {
        console.log('An error occured', error);
    });
    request.write(data)
    request.end()
});

app.delete('/app/delete/:year/:semester/:major/:course/:prof/:grade/.json', (req, res) => {
    if (req == undefined ||
        req.params === undefined ||
        req.params.year == undefined ||
        req.params.semester == undefined ||
        req.params.major == undefined ||
        req.params.course == undefined ||
        req.params.prof == undefined ||
        req.params.grade == undefined ){
            res.status(422).send(JSON.stringify("Error: Invalid parameters. Include year, semester, major, course number, professor, and grade.")).end()
            return;
    }
    newURL = url + req.params.year + "/" + req.params.semester + "/" + req.params.major + "/" + req.params.course + "/" + req.params.prof + "/.json"
    const firstRequest = https.request(newURL, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
      
        response.on('end', () => {
            var grades = JSON.parse(data);
            for (let grade in grades){
                if (grades[grade] == req.params.grade){
                    // Send the delete request now that we know the right grade index
                    var options = {
                        host: url.substring('https://'.length, url.length - 1),
                        path: ("/"+req.params.year + "/" + req.params.semester + "/" + req.params.major + "/" + req.params.course + "/" + req.params.prof + "/" + grade + ".json"),
                        method: 'DELETE',
                    }
                    var request = https.request(options, (res2) => {}) //should only ever get response null from server
                    request.on('error', (e) => {
                        console.log('An error occured: ', e)
                    })
                    request.end()
                    res.status(200).send(JSON.stringify("Successfully deleted")).end();
                    return;
                }
                index++;
            }
            res.status(400).send(JSON.stringify("Could not find specified grade to remove.")).end()
        });
    })
    firstRequest.on('error', (error) => {
        console.log('An error occured', error);
    });
    firstRequest.end()
    return
});

app.listen(port)