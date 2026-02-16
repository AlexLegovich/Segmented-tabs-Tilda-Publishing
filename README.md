Segmented Tabs Component for Tilda

Custom segmented tabs (segmented control) component designed specifically for use on the Tilda Publishing platform.

Developed by AG Design.


📌 Overview

This project provides a fully customizable segmented control (tab switcher) that works seamlessly inside Tilda using custom HTML blocks.

It supports:

Multiple independent segmented controls on the same page

Config-based styling (per control)

Animated slider transitions

Optional content fade animation


🎯 Purpose

Tilda does not provide advanced segmented/tab controls by default.
This solution allows designers and developers to:

Create modern tabbed interfaces

Control styles via configuration

Use it for navigation or content switching

Keep everything modular and reusable

⚙️ Features

1. Multiple Style Variants

Each segmented control is configured via:

data-segment-control="default"

Each variant can have its own:

Slider background

Slider shadow

Transition duration

Easing

Active button color

Content animation behavior

2. Config-Based Architecture

All styles are controlled inside:

const segmetnsConfig = { ... }


This allows:

Easy maintenance

Reusable styles

Clean scalability

Multiple independent controls per page

3. Optional Content Animation

Supports fade-in animation using the Web Animations API.

Config example:

contentAnimate: {
  opacity: 0,
  transitionDuration: 0.2,
  easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
}


Animation runs only when switching via click (not on scroll or resize).

4. Slider Animation

The slider animates using:

left

width

Custom duration

Custom cubic-bezier easing

Fully configurable per control.

🏗 Structure Example (Tilda)
Wrapper
<div class="segments-wrapper" data-segment-control="news">

Buttons
<div class="tn-molecule">
  <a class="segment-btn">Tab 1</a>
  <a class="segment-btn">Tab 2</a>
</div>

Content Sections
<div class="uc-news-1">Content 1</div>
<div class="uc-news-2">Content 2</div>


Naming must match:

uc-{controlName}-{index}


Example:

data-segment-control="news"
→ content class: uc-news-1

🔧 How It Works

Script detects all .segments-wrapper

Reads data-segment-control

Applies matching configuration

Creates slider dynamically

Controls content visibility

Applies animation when required

Each segmented control works independently.

📱 Responsive Behavior

Slider recalculates width and position on window resize

Active state preserved

Layout remains stable across breakpoints

🎨 Customization

To create a new styled segmented control:

Add new config inside segmentConfig

Assign data-segment-control="yourName"

Create matching content classes:

uc-yourName-1
uc-yourName-2


No additional JS changes required.

🧩 Technical Notes

Built with vanilla JavaScript

No external libraries

Uses Web Animations API

Designed for Tilda Zero Block usage

Fully inline-style based (no external CSS required)

👨‍💻 Author

Developed by AG Design
For custom interactive solutions on the Tilda platform.
