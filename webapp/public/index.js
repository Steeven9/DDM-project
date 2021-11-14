function submitQuery(event) {
  document.querySelector('#spinner').classList.remove('hidden');
  const q = event.target.elements.query.value;
  event.preventDefault();
  if (q.length === 0) {
    alert('Please insert a query');
    return;
  }

  const password = window.localStorage.getItem('neo4covid_password');
  fetch(`${window.location.protocol}//${window.location.host}/person?query=${q}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${password}`,
    },
  }).then(res => res.json())
    .then(data => {
      if (data.error) {
        throw data.error;
      }

      console.log(data);
      const typeSet = new Set();
      const config = {
        dataSource: {
          nodes: data.nodes.map(it => {
            const name = Object.keys(it.properties).length > 0
              ? it.labels.length > 0
                ? `${it.labels[0]} ${JSON.stringify(it.properties)}`
                : JSON.stringify(it.properties)
              : it.labels.length > 0
                ? it.labels[0]
                : '?';
            it.labels.forEach(l => typeSet.add(l));
            return {
              id: it.id,
              type: it.labels.length > 0 ? it.labels[0] : '?',
              name
            };
          }),
          edges: data.edges.map(it => {
            const caption = Object.keys(it.properties).length > 0
              ? `${it.type} ${JSON.stringify(it.properties)}`
              : it.type;
            return {
              source: it.source,
              target: it.target,
              caption,
            };
          }),
        },
        nodeStyle: {
          'all': {
            'radius': 10,
            'color'  : '#f5f5f5',
            'borderColor': '#66B9FF',
            'borderWidth': (_, radius) => radius / 3,
            'captionColor': '#FFFFFF',
            'captionBackground': null,
            'captionSize': 12,
            'highlighted': {
                'color' : '#66B9FF'
            },
          },
        },
      }
      alchemy = new Alchemy(config);
      alchemy.begin({
          nodeCaption: 'name', 
          nodeMouseOver: 'name',
      });
      document.querySelector('#spinner').classList.add('hidden');
    })
    .catch((e) => {
      document.querySelector('#spinner').classList.add('hidden');
      alert('Invalid query');
      console.error(e);
    });
}

function setPassword(event) {
  event.preventDefault();
  const password = event.target.elements.password.value;
  if (password && password.length > 0) {
    window.localStorage.setItem('neo4covid_password', password);
    alert('Password was set');
    window.location = `${window.location.protocol}//${window.location.host}`;
  } else {
    alert('Invalid password');
  }
}
