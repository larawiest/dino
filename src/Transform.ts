import { Angle } from './Angle.js'

// Transform is immutable!
export class Transform {
	
	//        |a  c  e|
	//   T =  |b  d  f|
	//        |0  0  1|
	constructor(
		readonly a: number,
		readonly b: number,
		readonly c: number,
		readonly d: number,
		readonly e: number,
		readonly f: number
	) {}

	static mul(t1: Transform, t2: Transform): Transform {
		return this.mul_abcdef(
			t1.a, t1.b, t1.c, t1.d, t1.e, t1.f,
			t2.a, t2.b, t2.c, t2.d, t2.e, t2.f
		)
	}

	mul(t: Transform): Transform {
		return Transform.mul(this, t)
	}

	static mul_abcdef(
		a1: number,
		b1: number,
		c1: number,
		d1: number,
		e1: number,
		f1: number,
		a2: number,
		b2: number,
		c2: number,
		d2: number,
		e2: number,
		f2: number
	): Transform {
		const a = a1 * a2 + c1 * b2
		const b = b1 * a2 + d1 * b2
		const c = a1 * c2 + c1 * d2
		const d = b1 * c2 + d1 * d2
		const e = a1 * e2 + c1 * f2 + e1
		const f = b1 * e2 + d1 * f2 + f1

		return new Transform(a, b, c, d, e, f)
	}

	x(x: number, y: number): number {
		return this.a * x + this.c * y + this.e
	}

	y(x: number, y: number): number {
		return this.b * x + this.d * y + this.f
	}

	static equal(t1: Transform, t2: Transform, eps = 0.000001):boolean {
		return (
			Math.abs(t1.a - t2.a) < eps &&
			Math.abs(t1.b - t2.b) < eps &&
			Math.abs(t1.c - t2.c) < eps &&
			Math.abs(t1.d - t2.d) < eps &&
			Math.abs(t1.e - t2.e) < eps &&
			Math.abs(t1.f - t2.f) < eps
		)
	}

	static translate(x: number, y: number): Transform {
		return new Transform(1.0, 0.0, 0.0, 1.0, x, y)
	}

	translate(x: number, y: number): Transform {
		return new Transform(this.a, this.b, this.c, this.d, this.e+x, this.f+y)
	}

	static scale(s: number): Transform {
		return new Transform(s, 0.0, 0.0, s, 0.0, 0.0)
	}

	//  |s 0| * |a c e| = |s*a s*c s*e|
	//  |0 s|   |b d f|   |s*b s*d s*f|
	scale(s: number): Transform {
		return new Transform(this.a*s, this.b*s, this.c*s, this.d*s, this.e*s, this.f*s)
	}

	static rotate(a : Angle) : Transform {
		const c = a.cos()
		const s = a.sin()
		return new Transform(c, s, -s, c, 0, 0)
	}

	rotate(a : Angle) : Transform {
		const c = a.cos()
		const s = a.sin()
		return Transform.mul_abcdef(c, s, -s, c, 0, 0, this.a, this.b, this.c, this.d, this.e, this.f)
	}

	static rotate90() : Transform {
		const c = 0
		const s = 1
		return new Transform(c, s, -s, c, 0, 0)
	}

	rotate90() : Transform {
		const c = 0
		const s = 1
		return Transform.mul_abcdef(c, s, -s, c, 0, 0, this.a, this.b, this.c, this.d, this.e, this.f)
	}

	static rotate270() : Transform {
		const c = 0
		const s = -1
		return new Transform(c, s, -s, c, 0, 0)
	}

	rotate270() : Transform {
		const c = 0
		const s = -1
		return Transform.mul_abcdef(c, s, -s, c, 0, 0, this.a, this.b, this.c, this.d, this.e, this.f)
	}

	static rotate180() : Transform {
		const c = -1
		const s = 0
		return new Transform(c, s, -s, c, 0, 0)
	}

	rotate180() : Transform {
		const c = -1
		const s = 0
		return Transform.mul_abcdef(c, s, -s, c, 0, 0, this.a, this.b, this.c, this.d, this.e, this.f)
	}

	static rotate_about_point_then_scale_and_translate(
		cos: number,
		sin: number,
		px: number,
		py: number,
		sx: number,
		sy: number,
		tx: number,
		ty: number
	): Transform {
		return new Transform(
			cos * sx,
			sin * sy,
			-sin * sx,
			cos * sy,
			(-px * cos + py * sin + px) * sx + tx,
			(-px * sin - py * cos + py) * sy + ty
		)
	}

	static viewToScreen(
		area_min_x: number,
		area_max_x: number,
		area_min_y: number,
		area_max_y: number,
		screen_size_x: number,
		screen_size_y: number,
		proportional = true
		//proportional= false
	): Transform {
		//screen_size_x *= 2 //test for scrolling
		//screen_size_y *= 2
		const area_size_x = area_max_x - area_min_x
		const area_size_y = area_max_y - area_min_y
		let scale_x
		let scale_y
		let d_x = 0.0
		let d_y = 0.0

		//	size_x				screen_size_x
		//	------	 <=>	-------------
		//	size_y				screen_size_y

		if (proportional) {
			if (area_size_x * screen_size_y > area_size_y * screen_size_x) {
				// area_size_x -> screen_size_x
				scale_x = screen_size_x / area_size_x
				scale_y = scale_x
				// center horizontally
				d_y = (screen_size_y - scale_x * area_size_y) * 0.5
			} else {
				// area_size_y -> screen_size_y
				scale_y = screen_size_y / area_size_y
				scale_x = scale_y
				// center vertically
				d_x = (screen_size_x - scale_y * area_size_x) * 0.5
			}
		} else {
			scale_x = screen_size_x / area_size_x
			scale_y = screen_size_y / area_size_y
		}

		return new Transform(
			scale_x,
			0.0,
			0.0,
			-scale_y,
			(-area_min_x * scale_x + d_x),
			(area_max_y * scale_y + d_y)
		)
	}

	invert(): Transform {
		const det = this.a * this.d - this.b * this.c
		const det_inv = 1.0 / det
		const invA = this.d * det_inv
		const invB = -this.b * det_inv
		const invC = -this.c * det_inv
		const invD = this.a * det_inv
		const invE = (this.c * this.f - this.d * this.e) * det_inv
		const invF = (this.b * this.e - this.a * this.f) * det_inv

		return new Transform(invA, invB, invC, invD, invE, invF)
	}

	invX(x : number, y : number) {
		const det = this.a * this.d - this.b * this.c
		const det_inv = 1.0 / det
		const invA = this.d * det_inv
		const invC = -this.c * det_inv
		const invE = (this.c * this.f - this.d * this.e) * det_inv
		return invA * x + invC * y + invE
	}

	invY(x: number, y: number): number {
		const det = this.a * this.d - this.b * this.c
		const det_inv = 1.0 / det
		const invB = -this.b * det_inv
		const invD = this.a * det_inv
		const invF = (this.b * this.e - this.a * this.f) * det_inv
		return invB * x + invD * y + invF
	}

}

