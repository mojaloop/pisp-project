


/**
 * Perform a 3rd party link, and then use that link to initiate a transaction
 * 
 */

import axios from "axios"
import TestEnv from "./TestEnv"


const atob = require('atob')
const btoa = require('btoa')




/*

controller.hasSelectedAccounts, true
deriving challenge from consent: {id: XoLJbH3saRa4b2iJDKzu, consentId: 46876aac-5db8-4353-bb3c-a6a905843ce7, party: {partyIdInfo: {partyIdType: OPAQUE, partyIdentifier:
123, fspId: applebank}}, status: CONSENT_GRANTED, userId: VQLEyvz9zYVucLbjJMErpwSFCVD2, consentRequestId: c51ec534-ee48-4575-b6a9-ead2955b8069, accounts: [{id:
4eb89bbf-14a7-4b0d-bae0-4929d383adc0, currency: USD}, {id: 3cf9c66e-bab7-4b41-af3e-46648bc84ee9, currency: USD}], authChannels: [OTP], authUri: https://dfspAuth.com,
authToken: 11222, initiatorId: pispa, participantId: dfsp, scopes: [{actions: [accounts.getBalance, accounts.transfer], accountId: 244431e2-7a56-40c6-814c-932631760fa9},
{actions: [accounts.getBalance, accounts.transfer], accountId: 6b6e6d77-dbf4-423f-abd5-bc5854e4ab1c}]}
Canonical string is:
{"consentId":"46876aac-5db8-4353-bb3c-a6a905843ce7","scopes":[{"accountId":"244431e2-7a56-40c6-814c-932631760fa9","actions":["accounts.getBalance","accounts.transfer"]},{
"accountId":"6b6e6d77-dbf4-423f-abd5-bc5854e4ab1c","actions":["accounts.getBalance","accounts.transfer"]}]}
bytes are: [123, 34, 99, 111, 110, 115, 101, 110, 116, 73, 100, 34, 58, 34, 52, 54, 56, 55, 54, 97, 97, 99, 45, 53, 100, 98, 56, 45, 52, 51, 53, 51, 45, 98, 98, 51, 99,
45, 97, 54, 97, 57, 48, 53, 56, 52, 51, 99, 101, 55, 34, 44, 34, 115, 99, 111, 112, 101, 115, 34, 58, 91, 123, 34, 97, 99, 99, 111, 117, 110, 116, 73, 100, 34, 58, 34,
50, 52, 52, 52, 51, 49, 101, 50, 45, 55, 97, 53, 54, 45, 52, 48, 99, 54, 45, 56, 49, 52, 99, 45, 57, 51, 50, 54, 51, 49, 55, 54, 48, 102, 97, 57, 34, 44, 34, 97, 99, 116,
105, 111, 110, 115, 34, 58, 91, 34, 97, 99, 99, 111, 117, 110, 116, 115, 46, 103, 101, 116, 66, 97, 108, 97, 110, 99, 101, 34, 44, 34, 97, 99, 99, 111, 117, 110, 116,
115, 46, 116, 114, 97, 110, 115, 102, 101, 114, 34, 93, 125, 44, 123, 34, 97, 99, 99, 111, 117, 110, 116, 73, 100, 34, 58, 34, 54, 98, 54, 101, 54, 100, 55, 55, 45, 100,
98, 102, 52, 45, 52, 50, 51, 102, 45, 97, 98, 100, 53, 45, 98, 99, 53, 56, 53, 52, 101, 52, 97, 98, 49, 99, 34, 44, 34, 97, 99, 116, 105, 111, 110, 115, 34, 58, 91, 34,
97, 99, 99, 111, 117, 110, 116, 115, 46, 103, 101, 116, 66, 97, 108, 97, 110, 99, 101, 34, 44, 34, 97, 99, 99, 111, 117, 110, 116, 115, 46, 116, 114, 97, 110, 115, 102,
101, 114, 34, 93, 125, 93, 125]
digest isedbe42953ef826960439db04dc669926b75b94d73fe9e081ea314e546bf27aa5
⚠️  AccountLinkingFlowController - signChallenge, signing challenge edbe42953ef826960439db04dc669926b75b94d73fe9e081ea314e546bf27aa5
⚠️  AccountLinkingFlowController - signChallenge, rp.id is: localhost
calling window.navigator.credentials.create with options:
 {"challenge":{"0":101,"1":100,"2":98,"3":101,"4":52,"5":50,"6":57,"7":53,"8":51,"9":101,"10":102,"11":56,"12":50,"13":54,"14":57,"15":54,"16":48,"17":52,"18":51,"19":57,
 "20":100,"21":98,"22":48,"23":52,"24":100,"25":99,"26":54,"27":54,"28":57,"29":57,"30":50,"31":54,"32":98,"33":55,"34":53,"35":98,"36":57,"37":52,"38":100,"39":55,"40":5
 1,"41":102,"42":101,"43":57,"44":101,"45":48,"46":56,"47":49,"48":101,"49":97,"50":51,"51":49,"52":52,"53":101,"54":53,"55":52,"56":54,"57":98,"58":102,"59":50,"60":55,"
 61":97,"62":97,"63":53},"rp":{"name":"Pineapple Pay","id":"localhost"},"user":{"id":{},"name":"test@example.com","displayName":"Example
 User"},"pubKeyCredParams":[{"alg":-7,"type":"public-key"}],"timeout":60000,"attestation":"direct"}
⚠️  AccountLinkingFlowController - signChallenge, credential is: {id: dhRwSpPOO7Zz2q8GEmoGmS6ytE3F9OKSAQ_SmkhkKRM15qjUUHAbnzU8vvYIXGyph6dHQpUsp8eOZCviiDv58Q, rawId: [118,
20, 112, 74, 147, 206, 59, 182, 115, 218, 175, 6, 18, 106, 6, 153, 46, 178, 180, 77, 197, 244, 226, 146, 1, 15, 210, 154, 72, 100, 41, 19, 53, 230, 168, 212, 80, 112, 27,
159, 53, 60, 190, 246, 8, 92, 108, 169, 135, 167, 71, 66, 149, 44, 167, 199, 142, 100, 43, 226, 136, 59, 249, 241], response: {attestationObject: [163, 99, 102, 109, 116,
102, 112, 97, 99, 107, 101, 100, 103, 97, 116, 116, 83, 116, 109, 116, 163, 99, 97, 108, 103, 38, 99, 115, 105, 103, 88, 72, 48, 70, 2, 33, 0, 168, 151, 252, 235, 20,
179, 246, 9, 251, 207, 165, 251, 97, 205, 91, 128, 53, 233, 179, 65, 225, 156, 84, 224, 220, 9, 136, 230, 157, 237, 217, 112, 2, 33, 0, 148, 246, 173, 24, 124, 187, 49,
208, 137, 237, 241, 86, 104, 42, 228, 90, 194, 89, 134, 246, 173, 244, 221, 254, 150, 243, 197, 173, 75, 39, 173, 152, 99, 120, 53, 99, 129, 89, 2, 193, 48, 130, 2, 189,
48, 130, 1, 165, 160, 3, 2, 1, 2, 2, 4, 11, 5, 205, 83, 48, 13, 6, 9, 42, 134, 72, 134, 247, 13, 1, 1, 11, 5, 0, 48, 46, 49, 44, 48, 42, 6, 3, 85, 4, 3, 19, 35, 89, 117,
98, 105, 99, 111, 32, 85, 50, 70, 32, 82, 111, 111, 116, 32, 67, 65, 32, 83, 101, 114, 105, 97, 108, 32, 52, 53, 55, 50, 48, 48, 54, 51, 49, 48, 32, 23, 13, 49, 52, 48,
56, 48, 49, 48, 48, 48, 48, 48, 48, 90, 24, 15, 50, 48, 53, 48, 48, 57, 48, 52, 48, 48, 48, 48, 48, 48, 90, 48, 110, 49, 11, 48, 9, 6, 3, 85, 4, 6, 19, 2, 83, 69, 49, 18,
48, 16, 6, 3, 85, 4, 10, 12, 9, 89, 117, 98, 105, 99, 111, 32, 65, 66, 49, 34, 48, 32, 6, 3, 85, 4, 11, 12, 25, 65, 117, 116, 104, 101, 110, 116, 105, 99, 97, 116, 111,
114, 32, 65, 116, 116, 101, 115, 116, 97, 116, 105, 111, 110, 49, 39, 48, 37, 6, 3, 85, 4, 3, 12, 30, 89, 117, 98, 105, 99, 111, 32, 85, 50, 70, 32, 69, 69, 32, 83, 101,
114, 105, 97, 108, 32, 49, 56, 52, 57, 50, 57, 54, 49, 57, 48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 3, 66, 0, 4, 33, 26,
111, 177, 181, 137, 37, 203, 10, 193, 24, 95, 124, 42, 227, 168, 180, 136, 16, 20, 121, 177, 30, 255, 245, 85, 224, 125, 151, 81, 189, 43, 23, 106, 37, 45, 238, 89, 236,
227, 133, 153, 32, 91, 179, 234, 40, 191, 143, 215, 252, 125, 167, 92, 5, 66, 114, 174, 72, 88, 229, 145, 252, 90, 163, 108, 48, 106, 48, 34, 6, 9, 43, 6, 1, 4, 1, 130,
196, 10, 2, 4, 21, 49, 46, 51, 46, 54, 46, 49, 46, 52, 46, 49, 46, 52, 49, 52, 56, 50, 46, 49, 46, 49, 48, 19, 6, 11, 43, 6, 1, 4, 1, 130, 229, 28, 2, 1, 1, 4, 4, 3, 2,
4, 48, 48, 33, 6, 11, 43, 6, 1, 4, 1, 130, 229, 28, 1, 1, 4, 4, 18, 4, 16, 20, 154, 32, 33, 142, 246, 65, 51, 150, 184, 129, 248, 213, 183, 241, 245, 48, 12, 6, 3, 85,
29, 19, 1, 1, 255, 4, 2, 48, 0, 48, 13, 6, 9, 42, 134, 72, 134, 247, 13, 1, 1, 11, 5, 0, 3, 130, 1, 1, 0, 62, 254, 163, 223, 61, 42, 224, 114, 87, 143, 126, 4, 208, 221,
90, 75, 104, 219, 1, 175, 232, 99, 46, 24, 180, 224, 184, 115, 67, 24, 145, 25, 108, 24, 75, 235, 193, 213, 51, 162, 61, 119, 139, 177, 4, 8, 193, 185, 170, 65, 78, 117,
118, 133, 91, 9, 54, 151, 24, 179, 72, 175, 92, 239, 108, 176, 48, 134, 114, 214, 31, 184, 189, 155, 134, 161, 10, 166, 130, 206, 140, 45, 78, 240, 144, 237, 80, 84, 24,
254, 83, 212, 206, 30, 98, 122, 40, 243, 114, 3, 9, 88, 208, 143, 250, 89, 27, 196, 24, 128, 225, 142, 138, 12, 237, 26, 133, 128, 127, 144, 150, 113, 65, 122, 11, 69,
50, 21, 179, 141, 193, 71, 42, 36, 73, 118, 64, 180, 232, 107, 254, 196, 241, 84, 99, 155, 133, 184, 232, 128, 20, 150, 54, 36, 56, 53, 89, 1, 43, 252, 135, 124, 11, 68,
236, 125, 167, 148, 210, 6, 84, 178, 154, 220, 29, 186, 92, 80, 123, 240, 202, 109, 243, 82, 188, 205, 222, 116, 13, 46, 167, 225, 8, 36, 162, 206, 57, 79, 144, 77, 29,
153, 65, 94, 58, 124, 69, 181, 254, 40, 122, 155, 203, 220, 105, 142, 139, 220, 213, 180, 121, 138, 92, 237, 53, 222, 138, 53, 9, 2, 10, 20, 183, 38, 191, 191, 57, 167,
68, 7, 156, 185, 143, 91, 157, 202, 9, 183, 195, 235, 188, 189, 162, 175, 105, 3, 104, 97, 117, 116, 104, 68, 97, 116, 97, 88, 196, 73, 150, 13, 229, 136, 14, 140, 104,
116, 52, 23, 15, 100, 118, 96, 91, 143, 228, 174, 185, 162, 134, 50, 199, 153, 92, 243, 186, 131, 29, 151, 99, 65, 0, 0, 0, 2, 20, 154, 32, 33, 142, 246, 65, 51, 150,
184, 129, 248, 213, 183, 241, 245, 0, 64, 118, 20, 112, 74, 147, 206, 59, 182, 115, 218, 175, 6, 18, 106, 6, 153, 46, 178, 180, 77, 197, 244, 226, 146, 1, 15, 210, 154,
72, 100, 41, 19, 53, 230, 168, 212, 80, 112, 27, 159, 53, 60, 190, 246, 8, 92, 108, 169, 135, 167, 71, 66, 149, 44, 167, 199, 142, 100, 43, 226, 136, 59, 249, 241, 165,
1, 2, 3, 38, 32, 1, 33, 88, 32, 15, 233, 112, 28, 86, 246, 137, 106, 111, 148, 180, 101, 74, 138, 50, 71, 10, 225, 205, 194, 222, 114, 190, 111, 172, 117, 17, 217, 37,
100, 104, 109, 34, 88, 32, 121, 225, 186, 200, 115, 177, 141, 104, 212, 216, 54, 254, 88, 141, 216, 155, 124, 189, 35, 249, 132, 204, 213, 44, 14, 88, 190, 113, 206, 155,
24, 94], clientDataJSON: [123, 34, 116, 121, 112, 101, 34, 58, 34, 119, 101, 98, 97, 117, 116, 104, 110, 46, 99, 114, 101, 97, 116, 101, 34, 44, 34, 99, 104, 97, 108,
108, 101, 110, 103, 101, 34, 58, 34, 90, 87, 82, 105, 90, 84, 81, 121, 79, 84, 85, 122, 90, 87, 89, 52, 77, 106, 89, 53, 78, 106, 65, 48, 77, 122, 108, 107, 89, 106, 65,
48, 90, 71, 77, 50, 78, 106, 107, 53, 77, 106, 90, 105, 78, 122, 86, 105, 79, 84, 82, 107, 78, 122, 78, 109, 90, 84, 108, 108, 77, 68, 103, 120, 90, 87, 69, 122, 77, 84,
82, 108, 78, 84, 81, 50, 89, 109, 89, 121, 78, 50, 70, 104, 78, 81, 34, 44, 34, 111, 114, 105, 103, 105, 110, 34, 58, 34, 104, 116, 116, 112, 58, 47, 47, 108, 111, 99,
97, 108, 104, 111, 115, 116, 58, 52, 50, 49, 56, 49, 34, 44, 34, 99, 114, 111, 115, 115, 79, 114, 105, 103, 105, 110, 34, 58, 102, 97, 108, 115, 101, 125]}}

*/
const consentRequestsPost = {
  toParticipantId: 'dfspa',
  userId: 'dfspa.username',
  consentRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
  authChannels: [
    'WEB',
    'OTP'
  ],
  accounts: [
    { accountNickname: 'SpeXXXXXXXXnt', id: '244431e2-7a56-40c6-814c-932631760fa9', currency: 'USD' },
    { accountNickname: 'SpeXXXXXXXXnt', id: '6b6e6d77-dbf4-423f-abd5-bc5854e4ab1c', currency: 'USD' }
  ],
  actions: ['accounts.transfer', 'accounts.getBalance'],
  callbackUri: 'pisp-app://callback.com'
}


// This credential was generated by the pisp-demo-ui
const linkingRequestConsentPassCredentialBody = {
  id: btoa('dhRwSpPOO7Zz2q8GEmoGmS6ytE3F9OKSAQ_SmkhkKRM15qjUUHAbnzU8vvYIXGyph6dHQpUsp8eOZCviiDv58Q'),
  rawId: Buffer.from([118,
    20, 112, 74, 147, 206, 59, 182, 115, 218, 175, 6, 18, 106, 6, 153, 46, 178, 180, 77, 197, 244, 226, 146, 1, 15, 210, 154, 72, 100, 41, 19, 53, 230, 168, 212, 80, 112, 27,
    159, 53, 60, 190, 246, 8, 92, 108, 169, 135, 167, 71, 66, 149, 44, 167, 199, 142, 100, 43, 226, 136, 59, 249, 241]).toString('base64'),
  response: {
    attestationObject: Buffer.from([163, 99, 102, 109, 116,
      102, 112, 97, 99, 107, 101, 100, 103, 97, 116, 116, 83, 116, 109, 116, 163, 99, 97, 108, 103, 38, 99, 115, 105, 103, 88, 72, 48, 70, 2, 33, 0, 168, 151, 252, 235, 20,
      179, 246, 9, 251, 207, 165, 251, 97, 205, 91, 128, 53, 233, 179, 65, 225, 156, 84, 224, 220, 9, 136, 230, 157, 237, 217, 112, 2, 33, 0, 148, 246, 173, 24, 124, 187, 49,
      208, 137, 237, 241, 86, 104, 42, 228, 90, 194, 89, 134, 246, 173, 244, 221, 254, 150, 243, 197, 173, 75, 39, 173, 152, 99, 120, 53, 99, 129, 89, 2, 193, 48, 130, 2, 189,
      48, 130, 1, 165, 160, 3, 2, 1, 2, 2, 4, 11, 5, 205, 83, 48, 13, 6, 9, 42, 134, 72, 134, 247, 13, 1, 1, 11, 5, 0, 48, 46, 49, 44, 48, 42, 6, 3, 85, 4, 3, 19, 35, 89, 117,
      98, 105, 99, 111, 32, 85, 50, 70, 32, 82, 111, 111, 116, 32, 67, 65, 32, 83, 101, 114, 105, 97, 108, 32, 52, 53, 55, 50, 48, 48, 54, 51, 49, 48, 32, 23, 13, 49, 52, 48,
      56, 48, 49, 48, 48, 48, 48, 48, 48, 90, 24, 15, 50, 48, 53, 48, 48, 57, 48, 52, 48, 48, 48, 48, 48, 48, 90, 48, 110, 49, 11, 48, 9, 6, 3, 85, 4, 6, 19, 2, 83, 69, 49, 18,
      48, 16, 6, 3, 85, 4, 10, 12, 9, 89, 117, 98, 105, 99, 111, 32, 65, 66, 49, 34, 48, 32, 6, 3, 85, 4, 11, 12, 25, 65, 117, 116, 104, 101, 110, 116, 105, 99, 97, 116, 111,
      114, 32, 65, 116, 116, 101, 115, 116, 97, 116, 105, 111, 110, 49, 39, 48, 37, 6, 3, 85, 4, 3, 12, 30, 89, 117, 98, 105, 99, 111, 32, 85, 50, 70, 32, 69, 69, 32, 83, 101,
      114, 105, 97, 108, 32, 49, 56, 52, 57, 50, 57, 54, 49, 57, 48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 3, 66, 0, 4, 33, 26,
      111, 177, 181, 137, 37, 203, 10, 193, 24, 95, 124, 42, 227, 168, 180, 136, 16, 20, 121, 177, 30, 255, 245, 85, 224, 125, 151, 81, 189, 43, 23, 106, 37, 45, 238, 89, 236,
      227, 133, 153, 32, 91, 179, 234, 40, 191, 143, 215, 252, 125, 167, 92, 5, 66, 114, 174, 72, 88, 229, 145, 252, 90, 163, 108, 48, 106, 48, 34, 6, 9, 43, 6, 1, 4, 1, 130,
      196, 10, 2, 4, 21, 49, 46, 51, 46, 54, 46, 49, 46, 52, 46, 49, 46, 52, 49, 52, 56, 50, 46, 49, 46, 49, 48, 19, 6, 11, 43, 6, 1, 4, 1, 130, 229, 28, 2, 1, 1, 4, 4, 3, 2,
      4, 48, 48, 33, 6, 11, 43, 6, 1, 4, 1, 130, 229, 28, 1, 1, 4, 4, 18, 4, 16, 20, 154, 32, 33, 142, 246, 65, 51, 150, 184, 129, 248, 213, 183, 241, 245, 48, 12, 6, 3, 85,
      29, 19, 1, 1, 255, 4, 2, 48, 0, 48, 13, 6, 9, 42, 134, 72, 134, 247, 13, 1, 1, 11, 5, 0, 3, 130, 1, 1, 0, 62, 254, 163, 223, 61, 42, 224, 114, 87, 143, 126, 4, 208, 221,
      90, 75, 104, 219, 1, 175, 232, 99, 46, 24, 180, 224, 184, 115, 67, 24, 145, 25, 108, 24, 75, 235, 193, 213, 51, 162, 61, 119, 139, 177, 4, 8, 193, 185, 170, 65, 78, 117,
      118, 133, 91, 9, 54, 151, 24, 179, 72, 175, 92, 239, 108, 176, 48, 134, 114, 214, 31, 184, 189, 155, 134, 161, 10, 166, 130, 206, 140, 45, 78, 240, 144, 237, 80, 84, 24,
      254, 83, 212, 206, 30, 98, 122, 40, 243, 114, 3, 9, 88, 208, 143, 250, 89, 27, 196, 24, 128, 225, 142, 138, 12, 237, 26, 133, 128, 127, 144, 150, 113, 65, 122, 11, 69,
      50, 21, 179, 141, 193, 71, 42, 36, 73, 118, 64, 180, 232, 107, 254, 196, 241, 84, 99, 155, 133, 184, 232, 128, 20, 150, 54, 36, 56, 53, 89, 1, 43, 252, 135, 124, 11, 68,
      236, 125, 167, 148, 210, 6, 84, 178, 154, 220, 29, 186, 92, 80, 123, 240, 202, 109, 243, 82, 188, 205, 222, 116, 13, 46, 167, 225, 8, 36, 162, 206, 57, 79, 144, 77, 29,
      153, 65, 94, 58, 124, 69, 181, 254, 40, 122, 155, 203, 220, 105, 142, 139, 220, 213, 180, 121, 138, 92, 237, 53, 222, 138, 53, 9, 2, 10, 20, 183, 38, 191, 191, 57, 167,
      68, 7, 156, 185, 143, 91, 157, 202, 9, 183, 195, 235, 188, 189, 162, 175, 105, 3, 104, 97, 117, 116, 104, 68, 97, 116, 97, 88, 196, 73, 150, 13, 229, 136, 14, 140, 104,
      116, 52, 23, 15, 100, 118, 96, 91, 143, 228, 174, 185, 162, 134, 50, 199, 153, 92, 243, 186, 131, 29, 151, 99, 65, 0, 0, 0, 2, 20, 154, 32, 33, 142, 246, 65, 51, 150,
      184, 129, 248, 213, 183, 241, 245, 0, 64, 118, 20, 112, 74, 147, 206, 59, 182, 115, 218, 175, 6, 18, 106, 6, 153, 46, 178, 180, 77, 197, 244, 226, 146, 1, 15, 210, 154,
      72, 100, 41, 19, 53, 230, 168, 212, 80, 112, 27, 159, 53, 60, 190, 246, 8, 92, 108, 169, 135, 167, 71, 66, 149, 44, 167, 199, 142, 100, 43, 226, 136, 59, 249, 241, 165,
      1, 2, 3, 38, 32, 1, 33, 88, 32, 15, 233, 112, 28, 86, 246, 137, 106, 111, 148, 180, 101, 74, 138, 50, 71, 10, 225, 205, 194, 222, 114, 190, 111, 172, 117, 17, 217, 37,
      100, 104, 109, 34, 88, 32, 121, 225, 186, 200, 115, 177, 141, 104, 212, 216, 54, 254, 88, 141, 216, 155, 124, 189, 35, 249, 132, 204, 213, 44, 14, 88, 190, 113, 206, 155,
      24, 94]).toString('base64'),
    clientDataJSON: Buffer.from([123, 34, 116, 121, 112, 101, 34, 58, 34, 119, 101, 98, 97, 117, 116, 104, 110, 46, 99, 114, 101, 97, 116, 101, 34, 44, 34, 99, 104, 97, 108,
      108, 101, 110, 103, 101, 34, 58, 34, 90, 87, 82, 105, 90, 84, 81, 121, 79, 84, 85, 122, 90, 87, 89, 52, 77, 106, 89, 53, 78, 106, 65, 48, 77, 122, 108, 107, 89, 106, 65,
      48, 90, 71, 77, 50, 78, 106, 107, 53, 77, 106, 90, 105, 78, 122, 86, 105, 79, 84, 82, 107, 78, 122, 78, 109, 90, 84, 108, 108, 77, 68, 103, 120, 90, 87, 69, 122, 77, 84,
      82, 108, 78, 84, 81, 50, 89, 109, 89, 121, 78, 50, 70, 104, 78, 81, 34, 44, 34, 111, 114, 105, 103, 105, 110, 34, 58, 34, 104, 116, 116, 112, 58, 47, 47, 108, 111, 99,
      97, 108, 104, 111, 115, 116, 58, 52, 50, 49, 56, 49, 34, 44, 34, 99, 114, 111, 115, 115, 79, 114, 105, 103, 105, 110, 34, 58, 102, 97, 108, 115, 101, 125]).toString('base64')
  },
  type: 'public-key'
}

// const validConsentsPostRequestAuth = {
//   consentId: validConsentId,
//   scopes: [
//     { actions: ['accounts.getBalance', 'accounts.transfer'], accountId: '412ddd18-07a0-490d-814d-27d0e9af9982' },
//     { actions: ['accounts.getBalance'], accountId: '10e88508-e542-4630-be7f-bc0076029ea7' }
//   ],
//   credential: {
//     credentialType: 'FIDO',
//     status: 'PENDING',
//     payload: {
//       id: atob('vwWPva1iiTJIk_c7n9a49spEtJZBqrn4SECerci0b-Ue-6Jv9_DZo3rNX02Lq5PU4N5kGlkEPAkIoZ3499AzWQ'),
//       rawId: atob('vwWPva1iiTJIk/c7n9a49spEtJZBqrn4SECerci0b+Ue+6Jv9/DZo3rNX02Lq5PU4N5kGlkEPAkIoZ3499AzWQ=='),
//       response: {
//         clientDataJSON: 'eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiTXpnd056QTFZMkU1TlRaaFlUZzBOMlE0T1dVMFlUUTBOR1JoT1dKbFpXUmpOR1EzTlRZNU1XSTBNV0l3WldNeE9EVTJZalJoWW1Sa05EbGhORE0yTUEiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjQyMTgxIiwiY3Jvc3NPcmlnaW4iOmZhbHNlfQ==',
//         attestationObject: 'o2NmbXRmcGFja2VkZ2F0dFN0bXSjY2FsZyZjc2lnWEcwRQIhAJEFVHrzmq90fdBVy4nOPc48vtvJVAyQleGVcp+nQ8lUAiB67XFnGhC7q7WI3NdcrCdqnewSjCfhqEvO+sbWKC60c2N4NWOBWQLBMIICvTCCAaWgAwIBAgIECwXNUzANBgkqhkiG9w0BAQsFADAuMSwwKgYDVQQDEyNZdWJpY28gVTJGIFJvb3QgQ0EgU2VyaWFsIDQ1NzIwMDYzMTAgFw0xNDA4MDEwMDAwMDBaGA8yMDUwMDkwNDAwMDAwMFowbjELMAkGA1UEBhMCU0UxEjAQBgNVBAoMCVl1YmljbyBBQjEiMCAGA1UECwwZQXV0aGVudGljYXRvciBBdHRlc3RhdGlvbjEnMCUGA1UEAwweWXViaWNvIFUyRiBFRSBTZXJpYWwgMTg0OTI5NjE5MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEIRpvsbWJJcsKwRhffCrjqLSIEBR5sR7/9VXgfZdRvSsXaiUt7lns44WZIFuz6ii/j9f8fadcBUJyrkhY5ZH8WqNsMGowIgYJKwYBBAGCxAoCBBUxLjMuNi4xLjQuMS40MTQ4Mi4xLjEwEwYLKwYBBAGC5RwCAQEEBAMCBDAwIQYLKwYBBAGC5RwBAQQEEgQQFJogIY72QTOWuIH41bfx9TAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4IBAQA+/qPfPSrgclePfgTQ3VpLaNsBr+hjLhi04LhzQxiRGWwYS+vB1TOiPXeLsQQIwbmqQU51doVbCTaXGLNIr1zvbLAwhnLWH7i9m4ahCqaCzowtTvCQ7VBUGP5T1M4eYnoo83IDCVjQj/pZG8QYgOGOigztGoWAf5CWcUF6C0UyFbONwUcqJEl2QLToa/7E8VRjm4W46IAUljYkODVZASv8h3wLROx9p5TSBlSymtwdulxQe/DKbfNSvM3edA0up+EIJKLOOU+QTR2ZQV46fEW1/ih6m8vcaY6L3NW0eYpc7TXeijUJAgoUtya/vzmnRAecuY9bncoJt8PrvL2ir2kDaGF1dGhEYXRhWMRJlg3liA6MaHQ0Fw9kdmBbj+SuuaKGMseZXPO6gx2XY0EAAAABFJogIY72QTOWuIH41bfx9QBAvwWPva1iiTJIk/c7n9a49spEtJZBqrn4SECerci0b+Ue+6Jv9/DZo3rNX02Lq5PU4N5kGlkEPAkIoZ3499AzWaUBAgMmIAEhWCAITUwire20kCqzl0A3Fbpwx2cnSqwFfTgbA2b8+a/aUiJYIHRMWJlb4Lud02oWTdQ+fejwkVo17qD0KvrwwrZZxWIg'
//       },
//       type: 'public-key'
//     }
//   }
// }


//TODO update me!
export const validVerificationRequest = {
  verificationRequestId: '835a8444-8cdc-41ef-bf18-ca4916c2e005',
  // This is stubbed out for pisp-demo-svc, where we generated these payloads
  // FIDO library actually signs the base64 hash of this challenge
  challenge: btoa('unimplemented123'),
  consentId: 'be433b9e-9473-4b7d-bdd5-ac5b42463afb',
  signedPayloadType: 'FIDO',
  signedPayload: {
    id: atob('vwWPva1iiTJIk_c7n9a49spEtJZBqrn4SECerci0b-Ue-6Jv9_DZo3rNX02Lq5PU4N5kGlkEPAkIoZ3499AzWQ'),
    rawId: 'vwWPva1iiTJIk_c7n9a49spEtJZBqrn4SECerci0b-Ue-6Jv9_DZo3rNX02Lq5PU4N5kGlkEPAkIoZ3499AzWQ',
    response: {
      authenticatorData: Buffer.from([73, 150, 13, 229, 136, 14, 140, 104, 116, 52, 23,
        15, 100, 118, 96, 91, 143, 228, 174, 185, 162, 134, 50, 199, 153, 92, 243, 186, 131, 29, 151, 99, 1, 0, 0, 0, 18]).toString('base64'),
      clientDataJSON: Buffer.from([123, 34, 116, 121, 112, 101, 34, 58,
        34, 119, 101, 98, 97, 117, 116, 104, 110, 46, 103, 101, 116, 34, 44, 34, 99, 104, 97, 108, 108, 101, 110, 103, 101, 34, 58, 34, 100, 87, 53, 112, 98, 88, 66, 115, 90, 87,
        49, 108, 98, 110, 82, 108, 90, 68, 69, 121, 77, 119, 34, 44, 34, 111, 114, 105, 103, 105, 110, 34, 58, 34, 104, 116, 116, 112, 58, 47, 47, 108, 111, 99, 97, 108, 104,
        111, 115, 116, 58, 52, 50, 49, 56, 49, 34, 44, 34, 99, 114, 111, 115, 115, 79, 114, 105, 103, 105, 110, 34, 58, 102, 97, 108, 115, 101, 44, 34, 111, 116, 104, 101, 114,
        95, 107, 101, 121, 115, 95, 99, 97, 110, 95, 98, 101, 95, 97, 100, 100, 101, 100, 95, 104, 101, 114, 101, 34, 58, 34, 100, 111, 32, 110, 111, 116, 32, 99, 111, 109, 112,
        97, 114, 101, 32, 99, 108, 105, 101, 110, 116, 68, 97, 116, 97, 74, 83, 79, 78, 32, 97, 103, 97, 105, 110, 115, 116, 32, 97, 32, 116, 101, 109, 112, 108, 97, 116, 101,
        46, 32, 83, 101, 101, 32, 104, 116, 116, 112, 115, 58, 47, 47, 103, 111, 111, 46, 103, 108, 47, 121, 97, 98, 80, 101, 120, 34, 125]).toString('base64'),
      signature: Buffer.from([48, 68, 2, 32, 104, 17,
        39, 167, 189, 118, 136, 100, 84, 72, 120, 29, 255, 74, 131, 59, 254, 132, 36, 19, 184, 24, 93, 103, 67, 195, 25, 252, 6, 224, 120, 69, 2, 32, 56, 251, 234, 96, 138, 6,
        158, 231, 246, 168, 254, 147, 129, 142, 100, 145, 234, 99, 91, 152, 199, 15, 72, 19, 176, 237, 209, 176, 131, 243, 70, 167]).toString('base64')
    },
    type: 'public-key'
  }
}

export const invalidVerificationRequest = {
  verificationRequestId: '835a8444-8cdc-41ef-bf18-ca4916c2e005',
  challenge: btoa('incorrect challenge!'),
  consentId: 'be433b9e-9473-4b7d-bdd5-ac5b42463afb',
  signedPayloadType: 'FIDO',
  signedPayload: {
    id: atob('vwWPva1iiTJIk_c7n9a49spEtJZBqrn4SECerci0b-Ue-6Jv9_DZo3rNX02Lq5PU4N5kGlkEPAkIoZ3499AzWQ'),
    rawId: 'vwWPva1iiTJIk_c7n9a49spEtJZBqrn4SECerci0b-Ue-6Jv9_DZo3rNX02Lq5PU4N5kGlkEPAkIoZ3499AzWQ',
    response: {
      authenticatorData: Buffer.from([73, 150, 13, 229, 136, 14, 140, 104, 116, 52, 23,
        15, 100, 118, 96, 91, 143, 228, 174, 185, 162, 134, 50, 199, 153, 92, 243, 186, 131, 29, 151, 99, 1, 0, 0, 0, 18]).toString('base64'),
      clientDataJSON: Buffer.from([123, 34, 116, 121, 112, 101, 34, 58,
        34, 119, 101, 98, 97, 117, 116, 104, 110, 46, 103, 101, 116, 34, 44, 34, 99, 104, 97, 108, 108, 101, 110, 103, 101, 34, 58, 34, 100, 87, 53, 112, 98, 88, 66, 115, 90, 87,
        49, 108, 98, 110, 82, 108, 90, 68, 69, 121, 77, 119, 34, 44, 34, 111, 114, 105, 103, 105, 110, 34, 58, 34, 104, 116, 116, 112, 58, 47, 47, 108, 111, 99, 97, 108, 104,
        111, 115, 116, 58, 52, 50, 49, 56, 49, 34, 44, 34, 99, 114, 111, 115, 115, 79, 114, 105, 103, 105, 110, 34, 58, 102, 97, 108, 115, 101, 44, 34, 111, 116, 104, 101, 114,
        95, 107, 101, 121, 115, 95, 99, 97, 110, 95, 98, 101, 95, 97, 100, 100, 101, 100, 95, 104, 101, 114, 101, 34, 58, 34, 100, 111, 32, 110, 111, 116, 32, 99, 111, 109, 112,
        97, 114, 101, 32, 99, 108, 105, 101, 110, 116, 68, 97, 116, 97, 74, 83, 79, 78, 32, 97, 103, 97, 105, 110, 115, 116, 32, 97, 32, 116, 101, 109, 112, 108, 97, 116, 101,
        46, 32, 83, 101, 101, 32, 104, 116, 116, 112, 115, 58, 47, 47, 103, 111, 111, 46, 103, 108, 47, 121, 97, 98, 80, 101, 120, 34, 125]).toString('base64'),
      signature: Buffer.from([48, 68, 2, 32, 104, 17,
        39, 167, 189, 118, 136, 100, 84, 72, 120, 29, 255, 74, 131, 59, 254, 132, 36, 19, 184, 24, 93, 103, 67, 195, 25, 252, 6, 224, 120, 69, 2, 32, 56, 251, 234, 96, 138, 6,
        158, 231, 246, 168, 254, 147, 129, 142, 100, 145, 234, 99, 91, 152, 199, 15, 72, 19, 176, 237, 209, 176, 131, 243, 70, 167]).toString('base64')
    },
    type: 'public-key'
  }
}


describe('pispLinkAndTransfer', () => {
  describe('happy path', () => {
    it.only('links an account and iniates a transaction', async () => {

      //shortcut
      const baseUrl = TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound

      // a map of predefined ids that we will use in our test
      const ids = {
        consentRequestId: 'c51ec534-ee48-4575-b6a9-ead2955b8069',
        // this needs to be deterministic for our pre-computed credentials to work
        consentId: '46876aac-5db8-4353-bb3c-a6a905843ce7'
      }

      // a map of the uris we will use for this test
      const uris = {
        linkingRequestConsent: `${baseUrl}/linking/request-consent`,
        linkingRequestConsentAuthenticate: `${baseUrl}/linking/request-consent/${ids.consentRequestId}/authenticate`,
        linkingRequestConsentPassCredential: `${baseUrl}/linking/request-consent/${ids.consentRequestId}/pass-credential`
      }

      // skip prelinking and discovery, that is tested elsewhere

      // Send initial consentRequest to the outbound PISP 3p-adapter
      const consentRequest = {
        ...consentRequestsPost,
        consentRequestId: ids.consentRequestId,
        toParticipantId: 'dfspa'
      }
      const expectedConsentsRequestResponse = {
        channelResponse: {
          scopes: [
            { actions: ['accounts.transfer', 'accounts.getBalance'], accountId: '244431e2-7a56-40c6-814c-932631760fa9' },
            { actions: ['accounts.transfer', 'accounts.getBalance'], accountId: '6b6e6d77-dbf4-423f-abd5-bc5854e4ab1c' }
          ],
          callbackUri: 'pisp-app://callback.com',
          authChannels: ['OTP'],
          consentRequestId: ids.consentRequestId,
        },
        currentState: 'OTPAuthenticationChannelResponseRecieved'
      }

      const consentRequestsResponse = await axios.post(uris.linkingRequestConsent, consentRequest)
      expect(consentRequestsResponse.status).toEqual(200)
      expect(consentRequestsResponse.data).toStrictEqual(expectedConsentsRequestResponse)


      // Send through an authtoken of '123456' to authenticate the user

      // dfsp simulator uses an authToken of 123456 to return a valid response
      const linkingRequestConsentAuthenticateRequest = {
        authToken: '123456'
      }
      const expectedConsentRequestAuthenticateResponse = {
        consentId: expect.any(String),
        consentRequestId: ids.consentRequestId,
        scopes: [
          { actions: ['accounts.transfer', 'accounts.getBalance'], accountId: '244431e2-7a56-40c6-814c-932631760fa9' },
          { actions: ['accounts.transfer', 'accounts.getBalance'], accountId: '6b6e6d77-dbf4-423f-abd5-bc5854e4ab1c' }
        ]
      }
      const consentRequestAuthenticateResponse = await axios.patch(uris.linkingRequestConsentAuthenticate, linkingRequestConsentAuthenticateRequest)

      expect(consentRequestAuthenticateResponse.status).toEqual(200)
      expect(consentRequestAuthenticateResponse.data.currentState).toEqual('consentReceivedAwaitingCredential')
      expect(consentRequestAuthenticateResponse.data.consent).toStrictEqual(expectedConsentRequestAuthenticateResponse)

      // Print consentId for debugging purposes:
      console.log(`consentRequestId: ${ids.consentRequestId} ---> consentId: ${ids.consentId}`)
      // The `TEST_SHOULD_OVERRIDE_CONSENT_ID` and `TEST_CONSENT_REQUEST_TO_CONSENT_MAP` should set this up for us
      expect(ids.consentId).toStrictEqual(consentRequestAuthenticateResponse.data.consent.consentId)


      // pass through the credential
      const linkingRequestConsentPassCredentialRequest = {
        credential: {
          payload: {
            ...linkingRequestConsentPassCredentialBody
          }
        }
      }
      const expectedResponse = {
        credential: {
          status: 'VERIFIED'
        },
        currentState: 'accountsLinked'
      }
      try {
        const passCredResponse = await axios.post(uris.linkingRequestConsentPassCredential, linkingRequestConsentPassCredentialRequest)
        expect(passCredResponse.status).toEqual(200)
        expect(passCredResponse.data).toEqual(expectedResponse)
      } catch (err) {
        console.log(err)
        throw err
      }

    })
  })
})