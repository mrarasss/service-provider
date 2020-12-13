class Utils {
    randomDate = (start, end) => {
        return new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
    };

    getRandomElementFromArray = (array) => {
        return array[Math.floor(Math.random() * array.length)]
    }

    generateSampleServiceRequests = (services) => {
        const sampleServiceRequests = [];

        for (let i = 1; i < 6; i++) {
            sampleServiceRequests.push({
                company: `Company ${i}`,
                requestedService: this.getRandomElementFromArray(services),
                description: `Awesome job opportunity in Company ${i}`,
                hourlyRate: Math.floor(Math.random() * 10) + 1,
                startDate: this.randomDate(new Date(), new Date(2021, i, 10)),
                endDate: this.randomDate(new Date(), new Date(2021, i + 5, 10)),
            });
        }

        sampleServiceRequests[0].startDate = sampleServiceRequests[1].startDate;

        return sampleServiceRequests;
    };
}

module.exports =  new Utils();
