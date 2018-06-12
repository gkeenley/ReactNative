var pieces = [
	[9, 8, 9, 2, 2, 3], // [[9, 2], [8, 3], [9, 2]]
	[6, 8, 2, 1, 3], // [[6, 2, 1], [8, 3]]
	[20], // false
	[9, 2], // [[9, 2]]
	[9, 8, 8, 2, 1, 2, 3], // [[9, 2], [8, 1, 2], [8, 3]]
	[9, 8, 8, 2, 2, 1, 3], // [[9, 2], [8, 2, 1], [8, 3]]
	[9, 8, 8, 2, 2, 3, 1], // [[9, 2], [8, 2, 1], [8, 3]]
	[8, 8, 2, 1], // [[8, 2], [8, 1]]
	[9, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1],
	[9, 11, 1, 11, 8], // 9
	[9, 11, 1, 11, 1, 11, 7], // 10
	[9, 11, 1, 11, 1, 11, 1, 11, 6], // 11
	[9, 11, 1, 11, 1, 11, 1, 11, 1, 11, 5], // 12
	[9, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 4], // 13
	[9, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 3], // 14
	[9, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 2], // 15
	[9, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1], // 16
	[90, 90, 90, 90, 90, 90, 80, 80, 80, 80, 80, 70, 70, 70, 70, 70, 70, 70, 70, 70, 50, 50, 50, 50, 50, 50, 50, 50, 50, 45, 45, 40, 40, 40, 40, 40, 40, 40, 35, 35, 30, 30, 30, 30, 30, 30, 30],
	[6, 1, 1, 7, 6], // 2 8 3 7 5 6
];
// var tol = 4;
// var goal1 = [310, 310, 310, 310, 310, 310, 310, 310, 310, 260, 260];
// var goal = [10, 10, 10];
var goal1 = [10, 10];
var ends1 = [28.5, 98, 54, 88, 44, 68, 18, 113, 62, 34, 43];
var output1 = [];
var row1 = [];

var flag = false;

function sum(arr) {
	return arr.reduce((sum, current) => sum + current, 0);
}

function itr(arr, row, output, i, rowIndex, ends, goal, tol, startTime) {
	if (flag == true)
		return null;
	if (Date.now() - startTime > 3000)
		return null;
	if (sum(row) + arr[i] <= goal[rowIndex] + tol) { // if piece fits in row...
		var arrWithRemoved = arr.slice(); // make array with that piece removed
		arrWithRemoved.splice(i, 1);
		var rowWithAdded = row.slice(); // make row with that piece added
		rowWithAdded.push(arr[i]);
		if (sum(row) + arr[i] >= goal[rowIndex] - tol) { // if piece completes row...
			// Try filling row more
			if (i < arrWithRemoved.length) {
				for (var j = i; j < arrWithRemoved.length; j++) { // try adding each remaining item
					var solution = itr(arrWithRemoved, rowWithAdded, output.slice(), j, rowIndex, ends, goal, tol, startTime);
					if (solution)
						return solution;
				}
			}
			// If filling row more didn't work, try leaving row as is
			var outputWithAdded = output.slice(); // make output with that row added
			outputWithAdded.push(rowWithAdded);
			rowIndex++;
			if (arrWithRemoved.length == 0) // if we've reached solution...
				return outputWithAdded;
			for (var j = 0; j < arrWithRemoved.length; j++) { // try adding each remaining item
				if (ends.length > 0)
					var solution = itr(arrWithRemoved, [ends[rowIndex]], outputWithAdded, j, rowIndex, ends, goal, tol, startTime);
				else
					var solution = itr(arrWithRemoved, [], outputWithAdded, j, rowIndex, ends, goal, tol, startTime);

				if (solution) // if adding that item yields solution...
					return solution; // return that solution
			}
			return false; // if we cycle through all remaining items without finding solution, return false
		} else { // if piece does not complete row...
			if (i >= arrWithRemoved.length) // if we have nothing left to fill row...
				return false;
			for (var j = i; j < arrWithRemoved.length; j++) { // try adding each remaining item
				var solution = itr(arrWithRemoved, rowWithAdded, output.slice(), j, rowIndex, ends, goal, tol, startTime);
				if (solution)
					return solution;
			}
			return false;
		}
	} else
		return false;
}


exports.func = function(a, b, c, d, e, f, g, h) {
	var date1 = Date.now();	
	// console.log(pieces[1], [], [], 0, 0, [], goal1, 1, date1);
	return itr(a, b, c, d, e, f, g, h, date1);
	// console.log("IT IS ", itr(a, b, c, d, e, f, g, h, date1));
	// console.log("IT AINT: ", pieces[17], [ends1[0]], [], 0, 0, ends1, goal1, 4, date1);
	// return itr(pieces[17], [ends1[0]], [], 0, 0, ends1, goal1, 4, date1);
	// return itr(a, b, c, d, e, f, g, h, date1);
}
