[press]
# Artifacts
## Information about artifacts

### Related references:
[OpenRockets Press: Get started](https://about.openrockets.com/docs/press/get-started)


At OpenRockets Press, we allocate specific types of artifacts for every type of publication. There are five main core artifact types, which are further divided into multiple subtypes depending on the circumstances. The five core types are 3D models, documents, images, software and code, and archived files (such as RAR and ZIP files). This documentation explains what these artifacts mean, how their types are categorized, and the capabilities our platform offers for displaying them. It also covers general technical knowledge for handling these files, special features available on our platform, and other miscellaneous information.

![image](https://github.com/user-attachments/assets/8012a24f-6acb-4684-acbc-0e6d376b40cd)

First, let us discuss the document artifact type. This category includes Microsoft Word files (.docx and .doc) and Portable Document Format files (.pdf). Currently, we do not support other document types like LaTeX, other TeX files, or programmable file types. However, we are happy to announce that we are working on rolling out support for these in the future, though the exact release date is currently uncertain.

For documents, we provide robust tools to support all versions of PDFs, ranging from early Acrobat and Flash Player PDFs to editable PDFs. Users do not need to worry about PDF versions because we use open source JavaScript PDF libraries and resources from the Free Software Foundation to process them.

Word files are handled uniquely. When you upload a Word file during the submission process, we first verify that it is not corrupted and is a valid document. Once verified, we transform the Word document into a PDF locally on your device. This process takes about two to three seconds on modern devices, though older devices made before 2010 might take 10 to 20 seconds. For most consumer devices, this works perfectly without errors. You do not need to convert your files manually; you can upload the Word document directly, and we will render and upload the PDF for you. You can even preview the PDF after the rendering is complete.

Unlike other publishers who compress PDF files, we do not compress them. We allow you to upload up to five PDF files, and each can be as large as 10 megabytes. This is roughly three to four times larger than an average eight-page document, giving you plenty of room to include related resources. We strictly separate PDFs from image files to avoid confusion and mandate strict characterization for our publishers.

We provide a robust PDF viewer, but we do not allow PDFs to be edited or annotated directly on our website. This restriction prevents derivative works that are prohibited by our licenses. Our licensing policies include Creative Commons Universal licenses, public domain licenses, and OpenRockets licenses such as OpenRockets Beaver, OpenRockets Kangaroo, and OpenRockets Hummingbird.

OpenRockets Press stores all PDFs and other artifacts in an encrypted manner. Even we cannot access your PDFs unless you grant us permission. If you want to delete a PDF after uploading it, you can do so via your submission panel or email us directly at press@openrockets.com for removals or any other requests. We are always happy to help.

Next, let us move to the images section. We handle images robustly, treating them with the same encrypted security as documents. We use a powerful image viewer that supports PNG, JPG, JPEG, TIFF, HEIC, BMP, and RAW file types. Unfortunately, we cannot support GIF files. Animated GIFs can be unpredictable and spammy, which interferes with our automated systems designed to retrieve harmful images. Even with human review, GIFs can potentially contain malicious code or viruses. For this reason, GIF files are not allowed.

If you have static images or animations, you can include them as links. We allow up to 10 links per artifact, which is a generous amount for directing viewers to external content. If you need to host a GIF, we recommend using Google Drive, Microsoft OneDrive, Dropbox, Pinterest, or other image hosting services, and then linking to them from your artifact page. For unsupported software file types, we recommend hosting them on Bitbucket, GitHub, or GitLab and providing a link.

Similarly, for 3D models, we do not support proprietary file types like Blender files because they require the Blender software to load and cannot be displayed in our viewers. However, we fully support standard 3D model extensions like OBJ and other 3D printing formats. If you create digital artwork, you must render the image from your software and upload the final image. We cannot display project files like PSDs because rendering them on our site would significantly slow down the page.

We also offer a specific image category called Image V2, designed for posters, banners, and club materials. For Image V2, we allocate a significant amount of storage and provide special delivery features. The dimensions of the image do not matter; you can upload an image with a height-to-width ratio of 1000 to 1, and our specialized viewer will handle it perfectly.

Additionally, you can upload multiple images and display them as a 3D object. This is ideal for showcasing physical objects like statues or inventions that you cannot model digitally but want to present dynamically. To use this feature, take pictures of the object from a minimum of four sides. You can include a fifth and sixth image for the top, bottom, or aerial views. We limit this to six images to save server space. When you check the "3D mode" box, our algorithm will morph the edges of the images together to create a 3D object. Viewers can then explore the object by dragging, zooming in, and zooming out.

Next is the software and code section. Software and code hold a prominent place at OpenRockets Press, and we offer multiple licensing options for these submissions. Code files can include any file type recognized as code. Because computer science has an immeasurable number of file extensions and anyone can create a new one, we do not enforce hard caps on code file extensions.

As a special feature for software developers, teenage software engineers, and young programmers, we allocate 20 megabytes per file for up to five files. If you have a large code project hosted on GitHub, you can easily publish it by clicking the green "Code" button on GitHub, selecting "Download ZIP," and uploading that ZIP file directly to our submission system. You can upload as many files as you want by zipping them, as long as the ZIP file does not exceed 20 megabytes. You can also upload single code files, provided they also stay under 20 megabytes.

To display code, we provide an Integrated Development Environment (IDE) experience. Unlike other publishers that only display code as plain text or downloadable packages, we treat code as a high-priority category. We use the open source Monaco Editor to display the contents of your uploaded files. If you upload a ZIP file, our system automatically unzips it and displays the folder contents directly in the viewer. This feature supports ZIP, RAR, TAR, and GZ files, so viewers do not have to download and unpack files manually.

However, there is a cap of 20,000 lines for the in-browser editor. If a file exceeds this limit, displaying it in the web editor would significantly slow down the page and create a poor experience for the viewer. The exact limit can also depend on the file size rather than just the line count. If a file is too large, we display a message stating that the file cannot be opened in the editor, but users can download it and open it on their local device for a better experience.

Regarding licensing, OpenRockets licenses are very powerful. We are actively working with legal experts, university professors, scientists, and volunteers from multiple countries to improve these licenses and establish them as a standard for protecting the intellectual property of minors. This is a massive undertaking. Once all the frameworks and changes are complete, we will propose our licenses to the Free Software Foundation, the governing body of open source licenses. If approved, OpenRockets licenses could become some of the most powerful open source licenses available.

We need your help as users, teenagers, and minors to build this community and ensure it remains positive and well-behaved. We moderate 100 percent of content, meaning nothing is published without our approval. If we detect inappropriate behavior, explicit material, or content that is not suitable for a community of minors and teenagers, we will reject it immediately, regardless of the submission. While OpenRockets Press is accessible to anyone on the internet, we strictly mandate that all internal contributors to the system must be minors. This makes our platform a highly secure place. Anyone, including adults, can view and download your content and use it appropriately according to our licenses, terms, and conditions.

At OpenRockets Press, we deeply respect your intellectual property rights. We take responsibility for filing complaints against violators, sending DMCA takedown notices to web hosts, and informing you if someone copies your work. Additionally, all artifacts are moderated in association with the California Digital Library, part of the ARK Alliance. This governing body provides unique archival identifiers, ensuring your content acts as a library entry and will never vanish overnight, even in an unlikely situation where our systems go dark.

Finally, I want to mention that the systems and developers behind this platform have built and tested everything to be 100 percent secure. We do not open source our proprietary systems to prevent potential exploits. We invite all high schoolers, university students, and anyone under the age of 20 to publish on our press. This is a welcoming community for everyone, and we encourage you to submit your work.

Thank you very much.

Neksha DeSilva, NA, OpenRockets Team


