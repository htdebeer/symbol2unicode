/**
 * symbol2unicode: convert a string of ascii symbols to unicode
 * 
 * copyright (C) 2016 Huub de Beer <Huub@heerdebeer.org>
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
export default class {
    constructor () {
        this.history = [];
        this.currentIndex = -1;
    }

    add (str) {
        if (0 < this.history.length) {
            const top = this.history[this.history.length - 1];

            if (top !== str) {
                this.history.push(str);
            }
        } else {
            this.history.push(str);
        }

        this.currentIndex = this.history.length - 1;
    }

    previous () {
        let str = "";
        if (0 <= this.currentIndex) {
            str = this.history[this.currentIndex];
            this.currentIndex--;
        }
        return str;
    }

    next () {
        let str = "";
        if (this.history.length - 1 > this.currentIndex) {
            this.currentIndex++;
            str = this.history[this.currentIndex];
        }
        return str;
    }
}
