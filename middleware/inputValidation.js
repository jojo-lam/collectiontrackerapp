module.exports = {
  validateInput: (req, res, next) => {
    inputRequest = req.body.data;
    console.log(
      '================================================',
      inputRequest,
      '================================================'
    );

    //turn input date into date type
    const inputDate = new Date(inputRequest.formValues.date);

    //calculate week after today to check if input is for this week or before
    const weekAfterToday = new Date();
    weekAfterToday.setDate(weekAfterToday.getDate() + 7);
    switch (inputDate.getDate()) {
      case inputDate.getDate() < weekAfterToday.getDate():
        res.send('The Date is way ahead');
      case inputDate.getDate() === null || inputDate.getDate() === undefined:
        res.send('No date was submitted');
    }

    //check entryWeights data
    for (entry of inputRequest.entryWeights) {
      //check if item_id is a number and is not negative
      console.log('CCCCCCOOOOONSOOOLE', entry);
      if (typeof entry.item !== 'number' || entry.item < 0) {
        return res.send('invalid item_id detected');
      }

      //make sure weights entered are not negative
      switch (entry.weight) {
        case entry.weight < 0:
          return res.send('unable to input negative weight');
      }

      return next();
    }
    // if(typeof(inputRequest.entryWeights.))//todo: loop through entry weight
  },
};
