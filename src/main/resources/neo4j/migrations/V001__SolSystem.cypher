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
