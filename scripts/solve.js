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
	return itr(a, b, c, d, e, f, g, h, date1);
}
