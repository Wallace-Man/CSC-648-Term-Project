# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.
|  |  |
| :---------------- | :---------------: |
| Server URL or IP | 34.94.177.91 |
| Database IP:Port | 34.94.177.91:3306 |
| Database username |  |
| Database password |  |
| MySQLWorkbench Connection Name | csc648db |
| Cloud SQL Instance Name/ID | csc648-cloud |

### Instructions on how to use the above information.

1. Download the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install-sdk)

3. Open a Terminal Window and cd into your downloads directory

   ```sh
   cd Downloads
   ```
   
3. Verify the file is in your Downloads directory

   ```sh
   ls
   ```
   
4. Move the file into your root user directory

   ```sh
   mv google-cloud-cli-418.0.0-darwin-x86_64.tar.gz ~/
   ```
   
5. Unpack the tar file

   ```sh
   tar xopf google-cloud-cli-418.0.0-darwin-x86_64.tar.gz
   ```
   
7. Delete the tar file now that we have unpacked it 

   ```sh
   rm xopf google-cloud-cli-418.0.0-darwin-x86_64.tar.gz
   ```
   
8. cd into google-cloud-sdk file

   ```sh
   cd google-cloud-sdk
   ```
   
9. Install Google Cloud SDK

   ```sh
   ./install.sh
   ```
   
#### Output after Successful Installation
* Answer N for 

  ```sh
  Do you want to help improve the Google Cloud CLI (y/N)?
  ```
  
<img width="1267" alt="Screenshot 2023-02-21 at 2 12 36 PM" src="https://user-images.githubusercontent.com/65887526/220470389-cee03ca4-1d84-43d5-9f83-99aea2a05143.png">

* Answer Y for 

  ```sh
  Do you want to continue (Y/n)?
  ```
  
<img width="1265" alt="Screenshot 2023-02-21 at 2 13 47 PM" src="https://user-images.githubusercontent.com/65887526/220470580-b1c63a24-225a-444f-a7a4-2fe72d313703.png">

10. Start a new shell for changes to take effect

12. cd into google-cloud sdk

   ```sh
   cd google-cloud-sdk
   ```
   
13. Update Google Cloud CLI Components

    ```sh
    gcloud components update
    ```
    
14. Login to Google Cloud

    ```sh
    gcloud auth login
    ```
    
    
# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
