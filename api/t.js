/**
 * @param {number[][]} piles
 * @param {number} k
 * @return {number}
 */

/*
we follow take not take approach


that is when we  choose top coin from current pile and move to next pile there is no going back to previous pile

1)take
that is we take top coin from cuurent pile move to next index with k reduced, or take top 2 coin from current pile and move to next pile  and so on 



t  n*k* k = n*(k^2)
s n*k


2)

or we never conside taking top cooin from current pile

*/
var maxValueOfCoins = function (piles, k) {
  const n = piles.length;

  const memo = {};

  function rec(ind, k) {
    if (ind === n || k === 0) {
      return 0;
    }

    const key = [ind, k].toString();

    if (key in memo) {
      return memo[key];
    }
    // not take  any coin from current pile

    let ans = 0;

    ans = Math.max(ans, rec(ind + 1, k));
    let currPileCoin = 0;
    //take one or more coin from current pile
    for (let i = 0; i < Math.min(k, piles[ind].length); i++) {
      currPileCoin += piles[ind][i];

      ans = Math.max(ans, currPileCoin + rec(ind + 1, k - (i + 1)));
    }

    memo[key] = ans;

    return ans;
  }

  return rec(0, k);
};
