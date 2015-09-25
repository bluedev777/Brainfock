/**
 * Brainfock - community & issue management software
 * Copyright (c) 2015, Sergii Gamaiunov (“Webkadabra”)  All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @link http://www.brainfock.com/
 * @copyright Copyright (c) 2015 Sergii Gamaiunov <hello@webkadabra.com>
 */

export const FIND = 'FIND';
export const FIND_ERROR = 'FIND_ERROR';
export const FIND_SUCCESS = 'FIND_SUCCESS';


const getApi = (fetch, endpoint) =>
  fetch(`/api/${endpoint}`, {
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    method: 'get'
  })
    .then(response => {
      if (response.status === 200) return response.json();
      throw response;
    });

export function findContextPage(context_id, uid) {
  return ({fetch, validate}) => ({
    types: [
      FIND,
      FIND_SUCCESS,
      FIND_ERROR
    ],
    payload: {
      promise:  getApi(fetch, 'wikiPages/findOne?filter[where][contextEntityId]='+context_id+'&filter[where][pageUid]='+uid)
        .catch(response => {
          // We can handle different password/username server errors here.
          //if (response.status === 401)
          //  throw validate.wrongPassword('password');
          throw response;
        })
    }
  });
}

export function findWikiSuccess(data) {
  return {
    type: FIND_SUCCESS,
    payload: {data}
  };
}
