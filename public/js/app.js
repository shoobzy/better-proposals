var observableElems = document.querySelectorAll('.observable');
var fadeInUpElems = document.querySelectorAll('.transitionable');

observableElems.forEach(function (el) {
    el.classList.add('opacity-50', 'transition-opacity', 'duration-500', 'delay-700');
});

fadeInUpElems.forEach(function (el) {
    el.classList.add('fadeInUp');
});


function deviceCounter() {
    var countOptions = {
        useEasing : true,
        useGrouping : true,
    };

    var pc = new CountUp('pc', 0, 42, 0, 3, countOptions);
    var tablet = new CountUp('tablet', 0, 14, 0, 3, countOptions);
    var mobile = new CountUp('mobile', 0, 34, 0, 3, countOptions);

    pc.start();
    tablet.start();
    mobile.start();
}

if ('IntersectionObserver' in window) {
    var options = {
        root: null, // relative to document viewport
        rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
        threshold: 1.0 // visible amount of item shown in relation to root
    };

    var observer1 = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                deviceCounter();
                observer1.unobserve(entry.target);
            }
        }, options);
    });

    var observer2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-50');
                entry.target.classList.add('observed');
            }
        }, options);
    });

    var observer3 = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.remove('fadeInUp');
            }
        }, options);
    });

    Object.values(document.querySelectorAll('.counters .counter')).forEach(function (item) {
        observer1.observe(item);
    });

    Object.values(document.querySelectorAll('section.observable')).forEach(function (item) {
        observer2.observe(item);
    });

    Object.values(document.querySelectorAll('.fadeInUp')).forEach(function (item) {
        observer3.observe(item);
    });
}
