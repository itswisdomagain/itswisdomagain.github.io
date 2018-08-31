function compare(h, d, a) {
	const min = [ 1 / h, 1 / a, 1 / d ];
	const sum = min.reduce((a, b) => a + b, 0);
	return 1 - sum;
}

function calculatePercentages(h, d, a) {
	let p1 = 1 / h;
	let p2 = 1 / d;
	let p3 = 1 / a;

	const diff = 1 - (p1 + p2 + p3);
	const tOdds = p1 + p2 + p3;
	
	p1 += (p1 / tOdds) * diff;
	p2 += (p2 / tOdds) * diff;
	p3 += (p3 / tOdds) * diff;

	let percentages = [p1 * 100, p2 * 100, p3 * 100];

	return percentages;
}

function nPr(xs, r) {
    if (!r) return [];
    return xs.reduce(function(memo, cur, i) {
        var others  = xs.slice(0,i).concat(xs.slice(i+1)),
            perms   = nPr(others, r-1),
            newElms = !perms.length ? [[cur]] :
                      perms.map(function(perm) { return [cur].concat(perm) });
        return memo.concat(newElms);
    }, []);
}

function runCheck(input) {
	const map = {};
	const labels = [];

	for (let s = 0; s < input.length; s++) {
		const label = ["site-" + (s + 1) + "-home", "site-" + (s + 1) + "-draw", "site-" + (s + 1) + "-away"];
		labels.push(label);

		for (let l = 0; l < label.length; l++) {
			map[label[l]] = input[s][l];
		}
	}

	const arrangedLabels = (nPr(labels, 3));
	let maxPotential = 0;
	let maxCombo = [];

	for (let set of arrangedLabels) {
		const homeLabel = set[0][0];
		const drawLabel = set[1][1];
		const awayLabel = set[2][2];

		let potential = compare(map[homeLabel], map[drawLabel], map[awayLabel]);
		if (potential > maxPotential) {
			maxPotential = potential;
			maxCombo = [homeLabel, drawLabel, awayLabel];
		}
	}

	if (maxCombo.length > 0) {
		const homeLabel = maxCombo[0], homeOdd = map[homeLabel];
		const drawLabel = maxCombo[1], drawOdd = map[drawLabel];
		const awayLabel = maxCombo[2], awayOdd = map[awayLabel];

		const percentages = calculatePercentages(homeOdd, drawOdd, awayOdd);

		const final = {
			home: homeLabel,
            homeOdd: homeOdd,
            homePercentage: percentages[0],
            homeEarning: percentages[0] * homeOdd,

            draw: drawLabel,
            drawOdd: drawOdd,
            drawPercentage: percentages[1],
            drawEarning: percentages[1] * drawOdd,

            away: awayLabel,
            awayOdd: awayOdd,
            awayPercentage: percentages[2],
            awayEarning: percentages[2] * awayOdd
		};

		return final;
	}
}