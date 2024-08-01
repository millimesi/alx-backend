import { expect } from "chai";
import kue from 'kue';
import createPushNotificationsJobs from "./8-job";

describe('createPushNotificationsJobs', () => {
    let queue;
    beforeEach(() => {
        queue = kue.createQueue();
        queue.testMode.enter();
    })

    afterEach(() => {
        queue.testMode.clear();
        queue.testMode.exit();
    })

    it('Tests successfull compeletion of jobs', ()=>{
        const list = [
            {
                phoneNumber: '4153518780',
                message: 'This is the code 1234 to verify your account'
            }
        ]
        createPushNotificationsJobs(list, queue);
        expect(queue.testMode.jobs.length).to.equal(1);
        const job = queue.testMode.jobs[0];
        expect(job.type).to.equal('push_notification_code_3');
        expect(job.data).to.deep.equal(list[0]);
    });

    it('Tests error throw for non list data', () => {
        expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
    });

    it('Tests if two new jobs created', () => {
        const list = [
                {
                    phoneNumber: '4153518782',
                    message: 'This is the code 1234 to verify your account'
                },
                {
                    phoneNumber: '4153518783',
                    message: 'This is the code 1234 to verify your account'
                }
            ]
        createPushNotificationsJobs(list, queue);
        expect(queue.testMode.jobs.length).to.equal(2);
    });
})
