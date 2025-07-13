import {Point} from './Points.ts'

export function deg2rad(angDeg: number): number {
	return (Math.PI * angDeg) / 180.0
}

export function rad2deg(angRad: number): number {
	return (angRad * 180.0) / Math.PI
}

export function cosDeg(angDeg: number): number {
	const angRad = deg2rad(angDeg)
	return Math.cos(angRad)
}

export function sinDeg(angDeg: number): number {
	const angRad = deg2rad(angDeg)
	return Math.sin(angRad)
}

/*
	liefert > 0 falls   |   	liefert < 0 falls   |   	liefert === 0 falls
		                 |                          |
		      r          |   	                    |
		                 |                          |
	p------------q      |   	p------------q      |   	p------r-----q

		                               r

  explanation:
 
  w = rot90(u) 
 
         
         ^
         |
         |   r
        w|  /
         | /v
         |/
         p---------->q
              u

    |wX| = rot90|uX| = |-uY|
    |wY|        |uY|   | uX|
 
 	 the result is dot(w,v)
*/
export function orientation(p : Point, q : Point, r : Point) {
	const uX= q.x-p.x
	const uY= q.y-p.y
	const vX= r.x - p.x
	const vY= r.y - p.y
	const wX= -uY
	const wY= uX
	// dot(w,v)
	return wX*vX + wY*vY
}
