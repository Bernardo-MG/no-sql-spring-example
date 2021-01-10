CREATE
   (planet:Planet {name: 'Mercury', position: 1 });
CREATE
   (info:Info {identifier: 1, id: 'tilt', label: 'Tilt', value: 0.03 });
CREATE
   (info:Info {identifier: 2, id: 'radius', label: 'Radius', value: 2439.7 });
CREATE
   (info:Info {identifier: 3, id: 'period', label: 'Period', value: 58.65 });

MATCH
   (a:Planet),(b:Info)
WHERE
   a.name = 'Mercury' AND b.identifier = 1
CREATE
   (a)-[r:INFORMATION]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Info)
WHERE
   a.name = 'Mercury' AND b.identifier = 2
CREATE
   (a)-[r:INFORMATION]->(b)
RETURN
   type(r);

MATCH
   (a:Planet),(b:Info)
WHERE
   a.name = 'Mercury' AND b.identifier = 3
CREATE
   (a)-[r:INFORMATION]->(b)
RETURN
   type(r);

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