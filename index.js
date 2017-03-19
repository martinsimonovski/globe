var dates = [
  {
    from: '2015-05-03',
    to: '2015-10-05'
  },
  {
    from: '2016-01-01',
    to: '2017-01-01',
  },
  {
    from: '2018-06-03',
    to: '2020-07-03',
  },
  {
    from: '2017-11-01',
    to: '2019-12-01'
  },
  {
    from: '2017-02-01',
    to: '2017-10-01'
  },
  {
    from: '2016-05-01',
    to: '2020-03-02'
  }
];

var previous,
    current,
    next;

var now = Date.now();
for (var i in dates){
  var from = Date.parse(dates[i].from);
  var to = Date.parse(dates[i].to);

  if (typeof current == 'undefined'){
    if (from < now && to > now){
      current = dates[i];
    }
  }

  if(to < now) {
    if ( typeof previous == 'undefined'){
      previous = dates[i];
    } else {
      if ( to > Date.parse(previous.to) ){
        previous = dates[i];
      }
    }
  }

  if(from > now) {
    if ( typeof next == 'undefined' && typeof current == 'undefined'){
      next = dates[i];
    } else if (typeof next == 'undefined') {
      if ( Date.parse(current.to) > from ){
        next = dates[i];
      }
    } else if (typeof current == 'undefined'){
      if ( from < Date.parse(next.from) ){
        next = dates[i];
      }
    } else {
      if (  Date.parse(current.to) > from && from < Date.parse(next.from) ){
        next = dates[i];
      }
    }
  }
}

console.log(previous, current, next);
