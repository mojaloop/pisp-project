# Identifiers

> ***Note:** This isn't the final destination for this documentation, I just figured this repo would be a good place to add any new docs. If you think it belongs elsewhere, please suggest a new location.*

## Purpose: 

Within the PISP world we are designing, we need a means to associate a PISP's view of a (user + device + account) with a DFSP's view of a (Party + Account), and be able to share such an association with other participants (DFSPs) in the Mojaloop Ecosystem.

For example:
1. Ayeesha holds 2 accounts with `DFSP A`, a Savings Account and Chequing Account
1. She also has a PISP account with `PISP X`, and has associated her Chequing Account with `DFSP A` with the PISP's app on her mobile device
1. Ayeesha wishes to send to Bravesh, who holds an account with `DFSP B`
1. Ayeesha wants to initiate the payment from the convenience of her PISP app (this flow is covered elsewhere)
1. Since she holds more than 1 account with `DFSP A`, the PISP needs a method to "tell" `DFSP A` which account Ayeesha wishes to use, and to debit.

This document aims to define the relationship between a party's account with a DFSP and a (Device + User + Account) registered with a PISP. Such a relationship needs to be:

1. **routeable:** Today, the Mojaloop ALS (account lookup service) is for looking up _parties_ and their associated _DFSPs_ and not specific _accounts_. For the sake of the PISP proposal, this means we need a new way to identify both a party and it's account which is held with a DFSP.
    - 1.1 This allows a PISP to "tell" a DFSP which account the user intended to send the funds from
1. **secure:** We don't want to ask DFSPs to disclose potentially sensitive information about a user and/or their account to the PISP if we don't have to.


## Flows:

### Basic Sequence Diagram

![Identifiers Association Flow](./out/identifiers-assoc/Identifiers_Association.png)


1. Ayeesha registers her chequing account with DFSP A to the PISP App  

> ... Account Linking Steps here...

2. DFSP A generates a random UUID, `1111-2222`, and internally saves a record: `1111-2222` refers to Ayeesha's Chequing account
3. DFSP A informs the PISP Server of the UUID, and asks it to use that UUID to refer to Ayeesha's chequing account on the PISP End
4. Async? callback
5. Internal processing
6. DFSP A asks the switch to create a new `ASSOCIATION` for `1111-2222`
7. Async Callback
8. Switch asks the ALS to create a new key/value pair for `ASSOCIATION/1111-2222` + `DFSPA`
9. Async Callback
10. Switch calls back to DFSP A, saying that the association has been created
11. DFSP calls back to the PISP Server, informing it that the association has been created


## Questions:

Q: Why can't the association between a PISP and DFSP Account be stored either with the DFSP or PISP? For example, the DFSP could give an account number to the PISP to store. Or the opposite, the PISP could generate their own association ID to give to the DFSP to be able to identify the sending account.
A: A few reasons:
  - There is no standard for accounts defined in Mojaloop. For the DFSP to give an 'account number' to the PISP, this would need to be defined, and would make the solution less generalizable accross a myriad of DFSPs
  - Even if we did have a standard for 'account number' the DFSP could share the a PISP, do we really want to ask the DFSP to disclose this information? In some instances it might be ok from a security perspective, but once again, that is heavily dependent on the DFSP's own implementations, which we don't want to get involved with.
  - The PISP could create an identifier and ask the DFSP to store this for them, but it seems to me that PISPs should be "read only" from DFSPs, and asking DFSPs to store a value on behalf of the PISPs would break the existing convention we have.
    > Could someone please add to this answer? Or let me know if it even makes sense? I'm sure there's other reasons we don't want to do this.


## Previous Discussion

> A summary of the existing discussion from our meeting + Slack.

### London Meeting Notes

#### Account identifiers and Information
- Need more work on this, most focus thus far has been on sending, not receiving
- e.g. From Alice@DFSPA to Bob@DFSPB
- But DFSPA needs to know which account to debit
- Therefore need to assign identifiers
  - because we are “sending from the account”
- Identifiers act as a link between PISP to a single account at DFSP
- PISP should know about it...

- need to do GET parties *both* for Sending Party and Receiving Party
  - E.g. check the sending account is not frozen. Give the Sending DFSP a chance to say "Wait, no this acc
  - need to map between what the PISP knows with what it can Tell the other Mojaloop participants


### Slack

*Michael Richards:*

**Thoughts on identifiers:**  
As part of the association process, either the PISP or the DFSP creates a nonce value (e.g. a UUID) to identify the association with a particular account.

1. We add a new identifier type, say ASSOCIATION
1. The PISP and the DFSP share the newly created value
1. The DFSP registers that value with the ALS
1. Now, when the PISP wants to identify the DFSP associated with a particular association, it can simply ask the ALS: who owns this association value? and the ALS responds: the DFSP...

*Lewis Daly:*

Thanks Michael, can you please jog my memory about the problem being solved with this?

*Sam:*

@Lewis Daly this is a proposal I think, to provide for identifying & associating multiple accounts (understanding the possibility of having multiple accounts for a same ID). Right now, the API supports only one account for any ID.  
@Michael Richards please let me know if I understood that correctly

*matdehaast:*  
And also ensuring account data provided to PISP's aren't sensitive data and mapped internally

*Michael Richards:*

The way in which Mojaloop obtains the route to a DFSP is by using an identifier - a `MSISDN`, or `IBAN`, or whatever - to get an answer from the ALS: apply to this DFSP. 

The DFSP then associates the identifier with an actual transaction account using its own internal processes which are undefined as far as Mojaloop is concerned. For associations between a PISP and a DFSP, we need to ensure that the identifier used by the PISP will always route to the associated account, so we want to make the identifier specific to that account. Which is what this solution is designed to achieve...

*Lewis Daly:* 

Ah I see, thanks. And as Matt said, we also want to make sure a PISP doesn’t know sensitive information about the account holder, right? Otherwise we could determine the UUID deterministically (ie. a hash value of the dfspId, pispId and account iban/msisdn)

*Michael Richards:*

Yes, indeed. You should keep arbitrary things arbitrary, in my view...