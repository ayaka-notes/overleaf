---
icon: list-check
---

# Project limits

| Feature                                          | Limit                                                                                                                                                                   |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Compile timeout                                  | **Default:** 180 seconds. See [Updating project compile timeout](../user-and-project-management/project-management/) for more information about customizing this value. |
| Maximum number of files per project              | 2000                                                                                                                                                                    |
| Maximum size of editable material per project    | **Default:** 7 MB. See [Environment variables](/broken/pages/7db9ebeae897423f645164394c78852702ffcec7) for more information about customizing this value.               |
| Maximum size of an individual editable text file | 2 MB\*                                                                                                                                                                  |
| Maximum size of an individual upload             | 50 MB                                                                                                                                                                   |
| Maximum size of project                          | Unlimited†                                                                                                                                                              |
| Maximum number of projects                       | Unlimited                                                                                                                                                               |

\* Some larger files may remain editable under certain circumstances. However, to ensure that a file remains editable, you should limit its size to 2 MB or less.

† There's no enforced limit on total project size. However, you may find some technical limitations when working with very large projects. We recommend a maximum project size of 500 MB, or less than 100 MB if using our [Git integration](https://www.overleaf.com/learn/how-to/Git_integration). Projects above these sizes may work, but staying within these limits will give you the best experience.
