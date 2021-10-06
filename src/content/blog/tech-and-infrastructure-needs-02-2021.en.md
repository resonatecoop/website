---
title: "Tech and Infrastructure Needs: 02/2021"
desctiption: ""
date: 2021-02-06
image: "images/blog/Resonate-Tech-and-Infrastructure-Needs-02-2021-Promo-2048x1152.jpg"
summary: "In working our way toward producing a mobile and desktop Resonate app, we could definitely use more help on the development side of things, but: trying to think outside of the box means having to account for a few extra things in the development process."

---

![](images/blog/Resonate-Tech-and-Infrastructure-Needs-02-2021-Promo-2048x1152.jpg)


In working our way toward producing a mobile and desktop Resonate app, we could definitely use more help on the development side of things, but:

Trying to think outside of the box means having to account for a few extra things in the development process.

This write-up is an overview of where Resonate is at in terms of tech and infrastructure needs as of February 2021.

• • •

**The main areas we are focused on now are:**

- The Player
- The Main Website
- ID and Access Management
- The Community Forum
- Accounting (Back Office)
- Catalogue Management

In each of these areas, we have different needs. It is also worth mentioning that we are in need of a Volunteer Development Lead / Coordinator.

For the **Player**, we will soon be releasing a new version with better playlists, and there are more social features we would like to add. For our **Main Website**, we are still in the process of transitioning from WordPress to Hugo (we need a wiki page too, by the way!). In terms of **ID and Access Management**, we are currently focused on work around the ID server, our user and member API, and a Community Credentials feature. For the **Community Forum** (built on Discourse), we are working on improving the overall design, as well as our community processes. In **Accounting**, we need a new payments API, as well as better statistics and financial reporting. And for **Catalogue Management**, we are working on both uploading and catalogue “ingestion” tooling.

**Our front-end stack is:**

- Choo (we rely on Choo modules)
- Hugo (for the new main site)
- Tooling (Figma for UI/UX designs; and Lerna, Gulp, PostCSS, etc., for JavaScript packages)

**Our back-end stack is:**

- Node.js (uploading)
- Golang (core APIs and OAuth 2.0 server)
- PHP (API for handling tracks, plays, Stripe payments, etc.)
- WordPress (current site with Gravity Forms and other plugins)
- Hugo (next site framework)
- Discourse (community service)

Our PHP API is partially integrated with the WordPress system via users and metadata. We use Docker containers with Ansible for automating our CI/CD pipeline. We also have an NGINX web server load-balancing tier. Our infrastructure platform is Hetzner Cloud (H-Cloud CLI tool). In terms of APIs, it is worth noting: our focus is secure, privacy-respecting user and member management. Our current legacy back end mostly uses WordPress and its Gravity Forms + Ultimate Member plugins, in addition to manual processes and spreadsheets (labor-intensive). Our future will be built around secure APIs with our own core code, and no data replication between legacy and the player. We are already moving to a microservices architecture with both RESTful Node.js APIs and RPC APIs written in Go using protocol buffers (Twirp/gRPC). We will use OpenAPI standards and provide developer-friendly SDKs. We are considering the use of more sophisticated API gateway tools like Kong for the future as well.

In terms of our player and the tracks API: the tracks API is moving to a new version and serves content to the player (a progressive web application written in Node.js). It provides audio and image files, as well as metadata such as artist, track, release, and playlist info.

In the future, our new user and membership API will provide more flexible and rich artist, label, and collaborator profile information to the player. You can find more details on the player [here](https://github.com/resonatecoop/resonate).

In both the current (beta) player and the new player, we use standard HTTP/2 from the Node.js server, and the Node.js client handles all buffering and content delivery. No encoding / DRM. Standard (not HQ) streams. Here is the current [REST API](https://github.com/resonatecoop/resonate/blob/master/docs/api.md). More on the new (v2) tracks API later.

With regard to managing our users’ information, the current WordPress site is complex and unwieldy to use for profiles. The WordPress Ultimate Member, Stripe, and Mailchimp plugins can be tricky to keep in line. There is also poor integration with our Discourse-based Resonate Community. Our ID server currently provides only partial authentication and no roles, resulting in multiple logins (to WordPress, Discourse, and the player). We do have partial introduction of PostgreSQL database, which is our target relational database, but for now, we are on MySQL.

Moving steadily to microservices: one of our goals is to finish transitioning out of WordPress and into Hugo, as well as a series of self-service apps (progressive web apps written in Node.js) for the player, and for transactions to update profiles and manage our catalogue. All of this will be handled by the core services, a cluster of scalable Golang microservices and APIs:

- User and Membership API
- Tracks API
- Payments API

Our payments API needs to give us flexibility for future, alternative, cheaper methods of payment. We need better integration across our statistical and billing/payments information from our platform too. That includes links with our accounting platform (Xero) and social media.

For identity management, our Go OAuth 2.0 server will allow role-based interaction between services with minimum exposure of user information, geared up for future “ecosystem” use of both Resonate identity and potential ID services. We currently have an exciting EU-supported Next Generation Internet project called “[Community Credentials](/community-credentials)” that allows for privacy-respecting portability of important credentials/proofs between members, and between communities. We use W3C verifiable credentials to do this.

The Resonate team has many more ideas and plans on the tech front, but until we are able to address some of these foundational and transitional concerns regarding tech and infrastructure (and obtain more resources), we will not be able to explore and build on them. If you are interested in tapping in with the Resonate team on the tech or infrastructure fronts, please hit us up! The sooner we get the support we need, the sooner we can provide a mobile app, desktop app, and more. You can reach us [here](https://resonate.is/volunteer/developers/).

Please don’t give up if we don’t respond right away; we have urgent work going on right now, and still don’t have have anyone available to do developer coordination work. We work out of GitHub and Basecamp, and have issues defined on task lists everyone can reach via the latter.