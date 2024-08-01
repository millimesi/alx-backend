import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;

  // Setup before each test
  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode.enter();  // Enter test mode
  });

  // Cleanup after each test
  afterEach(() => {
    queue.testMode.clear();  // Clear the queue
    queue.testMode.exit();   // Exit test mode
  });

  it('should create a job with the correct type and data', () => {
    const list = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      }
    ];

    createPushNotificationsJobs(list, queue);

    // Verify that the job was added to the queue
    expect(queue.testMode.jobs.length).to.equal(1);

    const job = queue.testMode.jobs[0];
    expect(job.type).to.equal('push_notification_code_3');
    expect(job.data).to.deep.equal(list[0]);
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
  });

  it('should create multiple jobs', () => {
    const list = [
      {
        phoneNumber: '4153518782',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518783',
        message: 'This is the code 1234 to verify your account'
      }
    ];

    createPushNotificationsJobs(list, queue);

    // Verify that the correct number of jobs were added
    expect(queue.testMode.jobs.length).to.equal(2);

    const [job1, job2] = queue.testMode.jobs;
    expect(job1.type).to.equal('push_notification_code_3');
    expect(job2.type).to.equal('push_notification_code_3');
    expect(job1.data).to.deep.equal(list[0]);
    expect(job2.data).to.deep.equal(list[1]);
  });
});
