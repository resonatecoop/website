---
title: 'Tech and Infrastructure Needs: 02/2021'
author: Z
type: post
date: 2021-02-06T14:37:07+00:00
url: /tech-and-infrastructure-needs-02-2021/
um_content_restriction:
  - 'a:8:{s:26:"_um_custom_access_settings";s:1:"0";s:14:"_um_accessible";s:1:"0";s:19:"_um_noaccess_action";s:1:"0";s:30:"_um_restrict_by_custom_message";s:1:"0";s:27:"_um_restrict_custom_message";s:0:"";s:19:"_um_access_redirect";s:1:"0";s:23:"_um_access_redirect_url";s:0:"";s:28:"_um_access_hide_from_queries";s:1:"0";}'
categories:
  - the blog

---
<img loading="lazy" decoding="async" class="aligncenter wp-image-7322 size-large" src="https://resonate.is/wp-content/uploads/2021/02/Resonate-Tech-and-Infrastructure-Needs-02-2021-Promo-1024x576.jpg" alt="" width="1024" height="576" srcset="http://resonate.localhost/wp-content/uploads/2021/02/Resonate-Tech-and-Infrastructure-Needs-02-2021-Promo-1024x576.jpg 1024w, http://resonate.localhost/wp-content/uploads/2021/02/Resonate-Tech-and-Infrastructure-Needs-02-2021-Promo-300x169.jpg 300w, http://resonate.localhost/wp-content/uploads/2021/02/Resonate-Tech-and-Infrastructure-Needs-02-2021-Promo-768x432.jpg 768w, http://resonate.localhost/wp-content/uploads/2021/02/Resonate-Tech-and-Infrastructure-Needs-02-2021-Promo-1536x864.jpg 1536w, http://resonate.localhost/wp-content/uploads/2021/02/Resonate-Tech-and-Infrastructure-Needs-02-2021-Promo-2048x1152.jpg 2048w" sizes="(max-width: 1024px) 100vw, 1024px" />

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">In working our way toward producing a mobile and desktop Resonate app, we could definitely use more help on the development side of things, but:</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Trying to think outside of the box means having to account for a few extra things in the development process.</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">This write-up is an overview of where Resonate is at in terms of tech and infrastructure needs as of February 2021.</span>

• • •

**<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">The main areas we are focused on now are:</span>**

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• The Player</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• The Main Website</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• ID and Access Management</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• The Community Forum</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• Accounting (Back Office)</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• Catalogue Management</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">In each of these areas, we have different needs. It is also worth mentioning that we are in need of a Volunteer Development Lead / Coordinator.</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">For the <strong>Player</strong>, we will soon be releasing a new version with better playlists, and there are more social features we would like to add. For our <strong>Main Website</strong>, we are still in the process of transitioning from WordPress to Hugo (we need a wiki page too, by the way!). In terms of <strong>ID and Access Management</strong>, we are currently focused on work around the ID server, our user and member API, and a Community Credentials feature. For the <strong>Community Forum</strong> (built on Discourse), we are working on improving the overall design, as well as our community processes. In <strong>Accounting</strong>, we need a new payments API, as well as better statistics and financial reporting. And for <strong>Catalogue Management</strong>, we are working on both uploading and catalogue “ingestion” tooling.<br /> </span>

**<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Our front-end stack is:</span>**

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• Choo (we rely on Choo modules)</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• Hugo (for the new main site)</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• Tooling (Figma for UX designs; and Lerna, Gulp, PostCSS, etc., for JavaScript packages)</span>

**<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Our back-end stack is:</span>**

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• Node.js (uploading)</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• Golang (core APIs and OAuth 2.0 server)</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• PHP (API for handling tracks, plays, Stripe payments, etc.)</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• WordPress (current site with Gravity Forms and other plugins)</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• Hugo (next site framework)</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• Discourse (community service)</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Our PHP API is partially integrated with the WordPress system via users and metadata. We use Docker containers with Ansible for automating our CI/CD pipeline. We also have an NGINX web server load-balancing tier. Our infrastructure platform is Hetzner Cloud (H-Cloud CLI tool).</span> <span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">In terms of APIs, it is worth noting: our focus is secure, privacy-respecting user and member management. Our current legacy back end mostly uses WordPress and its Gravity Forms + Ultimate Member plugins, in addition to manual processes and spreadsheets (labor-intensive). Our future will be built around secure APIs with our own core code, and no data replication between legacy and the player. We are already moving to a microservices architecture with both RESTful Node.js APIs and RPC APIs written in Go using protocol buffers (Twirp/gRPC). We will use OpenAPI standards and provide developer-friendly SDKs. We are considering the use of more sophisticated API gateway tools like Kong for the future as well.</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">In terms of our player and the tracks API: the tracks API is moving to a new version and serves content to the player (a progressive web application written in Node.js). It provides audio and image files, as well as metadata such as artist, track, release, and playlist info.</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">In the future, our new user and membership API will provide more flexible and rich artist, label, and collaborator profile information to the player. You can find more details on the player <a href="https://github.com/resonatecoop/resonate">here</a>.</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">In both the current (beta) player and the new player, we use standard HTTP/2 from the Node.js server, and the Node.js client handles all buffering and content delivery. No encoding / DRM. Standard (not HQ) streams. Here is the <a href="https://github.com/resonatecoop/resonate/blob/master/docs/api.md">current REST API</a>.  More on the new (v2) tracks API later.</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">With regard to managing our users&#8217; information, the current WordPress site is complex and unwieldy to use for profiles. The WordPress Ultimate Member, Stripe, and Mailchimp plugins can be tricky to keep in line. There is also poor integration with our Discourse-based Resonate Community. Our ID server currently provides only partial authentication and no roles, resulting in multiple logins (to WordPress, Discourse, and the player). We do have partial introduction of PostgreSQL database, which is our target relational database, but for now, we are on MySQL.<br /> </span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Moving steadily to microservices: one of our goals is to finish transitioning out of WordPress and into Hugo, as well as a series of self-service apps (progressive web apps written in Node.js) for the player, and for transactions to update profiles and manage our catalogue. All of this will be handled by the core services, a cluster of scalable Golang microservices and APIs:</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• User and Membership API</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• Tracks API</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">• Payments API<br /> </span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Our payments API needs to give us flexibility for future, alternative, cheaper methods of payment. We need better integration across our statistical and billing/payments information from our platform too. That includes links with our accounting platform (Xero) and social media.</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">For identity management, our Go OAuth 2.0 server will allow role-based interaction between services with minimum exposure of user information, geared up for future “ecosystem” use of both Resonate identity and potential ID services. We currently have an exciting EU-supported Next Generation Internet project called “<a href="https://resonate.is/community-credentials/">Community Credentials</a>” that allows for privacy-respecting portability of important credentials/proofs between members, and between communities. We use W3C verifiable credentials to do this.<br /> </span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">The Resonate team has many more ideas and plans on the tech front, but until we are able to address some of these foundational and transitional concerns regarding tech and infrastructure (and obtain more resources), we will not be able to explore and build on them. </span><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">If you are interested in tapping in with the Resonate team on the tech or infrastructure fronts, please hit us up! The sooner we get the support we need, the sooner we can provide a mobile app, desktop app, and more. You can reach us <a href="https://resonate.is/volunteer/developers/">here</a>.</span>

<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Please don&#8217;t give up if we don&#8217;t respond right away; we have urgent work going on right now, and still don&#8217;t have have anyone available to do developer coordination work. We work out of GitHub and Basecamp, and have issues defined on task lists everyone can reach via the latter.</span>