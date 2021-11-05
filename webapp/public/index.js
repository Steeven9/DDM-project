function submitQuery(event) {
    const q = event.target.elements.query.value;
    event.preventDefault();
    if (q.length === 0) {
      alert("Please insert a query")
      return
    }
    fetch(`${window.location.protocol}//${window.location.host}/person?query=${q}`, {
      headers: {
        'Accept': 'application/json',
      },
    }).then(res => res.json())
      .then(data => {
        const config = {
          dataSource: {
            nodes: data.map(it => {
                return {
                    id: it.id,
                    type: it.labels.join(', '),
                    name: Object.values(it.properties).join('\n'),
                };
            }),
            edges: [],
          },
          nodeStyle: {
            "all": {
                "radius": 10,
                "color"  : "#b1b1b1",
                "borderColor": "#127DC1",
                "borderWidth": function (d, radius) { radius / 3 },
                "captionColor": "#FFFFFF",
                "captionBackground": null,
                "captionSize": 12,
                "highlighted": {
                    "color" : "#EEEEFF"
                },
            }
          }
        }
        alchemy = new Alchemy(config);
        alchemy.begin({
            nodeCaption: 'name', 
            nodeMouseOver: 'name',
        })
      })
      .catch((e) => {
        alert("Invalid query");
        console.error(e);
      });
  }
  