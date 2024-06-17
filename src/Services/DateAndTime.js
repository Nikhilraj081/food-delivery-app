const formatISTDateTime = (date, time) => {
    const [hour, minute] = time.split(':');
    const dateTime = new Date(date);
    dateTime.setHours(parseInt(hour, 10));
    dateTime.setMinutes(parseInt(minute, 10));
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
      timeZone: 'Asia/Kolkata'
    }).format(dateTime);
  };

export {formatISTDateTime};