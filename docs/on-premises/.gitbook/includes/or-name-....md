---
title: '| Name                     ...'
---

```
| Name                                  | Description                                                                                                                                         |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GIT_BRIDGE_SWAPSTORE_TYPE`           | Set this to "s3" to activate the swap job.                                                                                                          |
| `GIT_BRIDGE_SWAPSTORE_AWS_ACCESS_KEY` | Your AWS access key                                                                                                                                 |
| `GIT_BRIDGE_SWAPSTORE_AWS_SECRET`     | Your AWS secret                                                                                                                                     |
| `GIT_BRIDGE_SWAPSTORE_S3_BUCKET_NAME` | This bucket will contain the zipped git repositories                                                                                                |
| `GIT_BRIDGE_SWAPSTORE_AWS_REGION`     | The bucket’s region                                                                                                                                 |
| `GIT_BRIDGE_SWAPJOB_MIN_PROJECTS`     | <p>How many projects to keep on disk, at a minimum. <br><br><strong>- Default:</strong> 50</p>                                                      |
| `GIT_BRIDGE_SWAPJOB_LOW_GIB`          | <p>Low watermark for swapping. The swap job will move projects until disk usage is below this value.<br><br><strong>- Default:</strong> 128 GB</p>  |
| `GIT_BRIDGE_SWAPJOB_HIGH_GIB`         | <p>High watermark for swapping. The swap job will start swapping when disk usage reaches this value. <br><br><strong>- Default:</strong> 256 GB</p> |
| `GIT_BRIDGE_SWAPJOB_INTERVAL_MILLIS`  | <p>The amount of time between checking disk usage and running the swap job. <br><br><strong>- Default:</strong> 3600000 ms = 1 hour</p>             |
```
