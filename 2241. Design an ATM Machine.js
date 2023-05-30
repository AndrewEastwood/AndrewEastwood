var ATM = function() {
  // . . . . . . . . . .20 | 50 | 100 | 200 | 500
  this.denominations = [ 0,   0,    0,    0,    0];
  // . . . . . . . ..at: 0.   1.    2.    3.    4.
};

/** 
 * @param {number[]} banknotesCount
 * @return {void}
 */
ATM.prototype.deposit = function(banknotesCount) {
    for(let k in banknotesCount) {
      this.denominations[k] += banknotesCount[k];
    }
};

/** 
 * @param {number} amount
 * @return {number[]}
 */
ATM.prototype.withdraw = function(amount) {
    let rest = amount;
    let reqNotes = 0;
    let takeNotesCount = 0;
    const banknotes = [0, 0, 0, 0, 0];
    const [
      available20,
      available50,
      available100,
      available200,
      available500
    ] = this.denominations;

    // 500
    reqNotes = Math.floor(rest / 500);
    if (reqNotes > 0 && available500 > 0) {
      takeNotesCount = Math.min(available500, reqNotes);
      banknotes[4] = takeNotesCount;
      rest -= takeNotesCount * 500;
    }

    // 200
    reqNotes = Math.floor(rest / 200);
    if (reqNotes > 0 && available200 > 0) {
      takeNotesCount = Math.min(available200, reqNotes);
      banknotes[3] = takeNotesCount;
      rest -= takeNotesCount * 200;
    }

    // 100
    reqNotes = Math.floor(rest / 100);
    if (reqNotes > 0 && available100 > 0) {
      takeNotesCount = Math.min(available100, reqNotes);
      banknotes[2] = takeNotesCount;
      rest -= takeNotesCount * 100;
    }

    // 50
    reqNotes = Math.floor(rest / 50);
    if (reqNotes > 0 && available50 > 0) {
      takeNotesCount = Math.min(available50, reqNotes);
      banknotes[1] = takeNotesCount;
      rest -= takeNotesCount * 50;
    }

    // 20
    reqNotes = Math.floor(rest / 20);
    if (reqNotes > 0 && available20 > 0) {
      takeNotesCount = Math.min(available20, reqNotes);
      banknotes[0] = takeNotesCount;
      rest -= takeNotesCount * 20;
    }

    const succeed = !(amount > 0 && rest === amount || rest > 0);

    if (succeed) {
      this.deposit(banknotes.map(v => 0 - v));
      return banknotes;
    }
    
    return [-1];
};

/** 
 * Your ATM object will be instantiated and called as such:
 * var obj = new ATM()
 * obj.deposit(banknotesCount)
 * var param_2 = obj.withdraw(amount)
 */
