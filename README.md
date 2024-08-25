## The Good Congress
This application is designed to provide comprehensive insights into the financial influences shaping the behavior of current U.S. Congress members. By tracking contributions from organizations and industries, this tool aims to increase transparency around how money flows into our political system and how it may influence legislative behavior.

## App Overview

### Congress Dashboard (Landing Page)

- List of Politicians: View a comprehensive list of current U.S. Congress members.
- Detailed Profiles: Click on a name to access a detailed dashboard for each member.

### Member Dashboard

- Name
- Leadership Position
- Political Party
- State and District
- Terms Served
- Sponsored Bills: View bills sponsored by the member.
- Cosponsored Bills: View bills cosponsored by the member.
- Financial Summary: A chart displaying:
    - Cash on Hand
    - Debt
    - Amount Spent
- Top Contributors:
	- Top 10 Organizations: Organizations contributing to the member’s campaign.
	- Top 10 Industries: Industries that have made significant contributions.


## Data Sources

- [api.congress.gov](https://api.congress.gov/#/congressional-record/congressional_record_list) - provides basic information 
- [opensecrets.org](https://www.opensecrets.org/open-data/api) - provides financial information
- [api.open.fec.gov](https://api.open.fec.gov/developers/#/committee/get_v1_committees_) - provides campaign funding information


### Roadmap
- Legislator Dashboard module
    - Member => Bill Information
- Committees Module
    - Provide financial contributions for a specific committee and show their prioritized bills
- Find a way to incorporate FEC data...


## Getting Started

If you want to contribute, clone the repo and get the following api keys from the data sources:

```bash
NEXT_PUBLIC_OPEN_SECRETS_API_KEY=
NEXT_PUBLIC_OPEN_FEC_API_KEY=
NEXT_PUBLIC_OPEN_CONGRESS_GOV_API_KEY=
```

