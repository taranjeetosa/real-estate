# Google Sheets lead form setup

The website's lead popup submits to a Google Apps Script web app, which appends
each lead to the first worksheet in the linked spreadsheet.

1. Open the **Real Estate leads** spreadsheet.
2. Select **Extensions → Apps Script**.
3. Replace the editor contents with [`Code.gs`](./Code.gs) and save.
4. For a first deployment, select **Deploy → New deployment** and choose
   **Web app**. For an existing deployment, select **Deploy → Manage
   deployments → Edit**, choose **New version**, and deploy the update. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Deploy, authorize the requested spreadsheet access, and copy the web app URL
   ending in `/exec`.
6. Create a `.env.local` file in the project root and set:

   ```text
   VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   ```

7. Restart the Vite server and set the same environment variable in the
   production hosting environment before building/deploying the website.

The script adds column headings when the first worksheet is empty. Both the
popup and **Show Interest** forms append to this worksheet, recording submission
time, name, phone, email, learning pathway, preferred contact time (when
provided), and lead source. Anyone can submit to a web app deployed
with public access, so review the sheet regularly and redeploy the script if
you change its code.
