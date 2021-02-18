// *******
// Planets
// *******

CREATE
   (planet:Planet {name: 'Mercury', position: 1 });
CREATE
   (planet:Planet {name: 'Venus', position: 2 });
CREATE
   (planet:Planet {name: 'Earth', position: 3 });
CREATE
   (planet:Planet {name: 'Mars', position: 4 });
CREATE
   (planet:Planet {name: 'Jupiter', position: 5 });
CREATE
   (planet:Planet {name: 'Saturn', position: 6 });
CREATE
   (planet:Planet {name: 'Uranus', position: 7 });
CREATE
   (planet:Planet {name: 'Neptune', position: 8 });

// *****
// Moons
// *****

// Earth's

CREATE
   (moon:Moon {name: 'Moon' });

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Earth' AND b.name = 'Moon'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);
   
// Mars'

CREATE
   (moon:Moon {name: 'Phobos' });
CREATE
   (moon:Moon {name: 'Deimos' });

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Mars' AND b.name = 'Phobos'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Mars' AND b.name = 'Deimos'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);
   
// Jupiter's

CREATE
   (moon:Moon {name: 'Io' });
CREATE
   (moon:Moon {name: 'Europa' });
CREATE
   (moon:Moon {name: 'Ganymede' });
CREATE
   (moon:Moon {name: 'Callisto' });

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Jupiter' AND b.name = 'Io'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Jupiter' AND b.name = 'Europa'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Jupiter' AND b.name = 'Ganymede'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Jupiter' AND b.name = 'Callisto'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

// Saturn's

CREATE
   (moon:Moon {name: 'Titan' });
CREATE
   (moon:Moon {name: 'Rhea' });
CREATE
   (moon:Moon {name: 'Iapetus' });

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Saturn' AND b.name = 'Titan'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Saturn' AND b.name = 'Rhea'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Saturn' AND b.name = 'Iapetus'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

// Uranus'

CREATE
   (moon:Moon {name: 'Titania' });
CREATE
   (moon:Moon {name: 'Oberon' });
CREATE
   (moon:Moon {name: 'Umbriel' });
CREATE
   (moon:Moon {name: 'Ariel' });
CREATE
   (moon:Moon {name: 'Miranda' });

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Uranus' AND b.name = 'Titania'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Uranus' AND b.name = 'Oberon'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Uranus' AND b.name = 'Umbriel'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Uranus' AND b.name = 'Ariel'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Uranus' AND b.name = 'Miranda'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);

// Neptune

CREATE
   (moon:Moon {name: 'Triton' });

MATCH
   (a:Planet),(b:Moon)
WHERE
   a.name = 'Neptune' AND b.name = 'Triton'
CREATE
   (a)-[r:SATELLITE]->(b)
RETURN
   type(r);
