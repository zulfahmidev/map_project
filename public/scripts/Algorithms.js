
let cache = {
    nodes: [],
    lines: []
}

function reset() {
    cache.nodes.forEach((v) => {
        v.h = 0;
        v.f = 0;
        v.g = 0;
        v.previous = undefined;
    })
    cache.nodes = []; 
    cache.lines = []; 
}

function Dijkstra(from, to) {
    reset();
    node_start = Nodes.getNearNode(from);
    node_end = Nodes.getNearNode(to);
    let openSet = [];
    let closedSet = [];

    let path = [];
    openSet.push(node_start); 
    cache.nodes.push(node_start);

    while (openSet.length > 0) {
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        
        let current = openSet[winner];
        

        if (current.getId() == node_end.getId()) {
            path = [];
            let temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
            coloredLine(path.reverse(), node_end);
            openSet = [];
            // return 'DONE';
            console.log(path.reverse())
        }

        openSet = rmNode(openSet, current.getId());
        closedSet.push(current);
        
        let graphs = current.getGraphs();
        for (let i = 0; i < graphs.length; i++) {
            let graph = graphs[i];
            let neighbor = graphs[i].getTo(current.getId());
            let newPath = false;
            
            if (!isExists(closedSet, neighbor.getId())) {
                let tempG = current.g + graph.getDistance();
                
                if (isExists(openSet, neighbor.getId())) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                    }
                } else {
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                    newPath = true;
                }
                
                if (newPath) {
                    neighbor.h = heuristic(neighbor, node_end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                    cache.nodes.push(neighbor)
                }
            }

        }
    }

    function heuristic(m, n) {
        return Utils.distanceTo(m.getPosition().lat, m.getPosition().lat, n.getPosition().lng, n.getPosition().lng);
    }

    function isExists(nodes, id) {
        return nodes.find((v) => {
            return v.getId() == id;
        }) != undefined;
    }

    function rmNode(nodes, id) {
        return nodes.filter((v) => {
            return v.getId() != id;
        })
    }
    
    function coloredLine(nodes, node_end) {
        
        let c = 0;
        let graphs = [];
        while (nodes[c].getId() != node_end.getId()) {
            nodes[c].getGraphs().forEach(n => {
                
                if (c+1 < nodes.length) {
                    if (n.getTo(nodes[c].getId()).getId() == nodes[c + 1].getId()) {
                        graphs.push(n);
                        c++;
                    }
                }
            })
        }
        cache.graphs = graphs;
        graphs.forEach(v => {
            v.show();
        })
    }
}