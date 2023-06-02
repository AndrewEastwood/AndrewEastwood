# Lookahead and lookbehind

Sometimes we need to find only those matches for a pattern that are followed or preceded by another pattern.

There’s a special syntax for that, called “lookahead” and “lookbehind”, together referred to as “lookaround”.

For the start, let’s find the price from the string like `1 turkey costs 30€`. That is: a number, followed by `€` sign.

[Lookahead](#lookahead)
-----------------------

The syntax is: `X(?=Y)`, it means "look for `X`, but match only if followed by `Y`". There may be any pattern instead of `X` and `Y`.

For an integer number followed by `€`, the regexp will be `\d+(?=€)`:

[](# "run")

[](# "open in sandbox")

`let str = "1 turkey costs 30€";  alert( str.match(/\d+(?=€)/) ); // 30, the number 1 is ignored, as it's not followed by €`

Please note: the lookahead is merely a test, the contents of the parentheses `(?=...)` is not included in the result `30`.

When we look for `X(?=Y)`, the regular expression engine finds `X` and then checks if there’s `Y` immediately after it. If it’s not so, then the potential match is skipped, and the search continues.

More complex tests are possible, e.g. `X(?=Y)(?=Z)` means:

1.  Find `X`.
2.  Check if `Y` is immediately after `X` (skip if isn’t).
3.  Check if `Z` is also immediately after `X` (skip if isn’t).
4.  If both tests passed, then the `X` is a match, otherwise continue searching.

In other words, such pattern means that we’re looking for `X` followed by `Y` and `Z` at the same time.

That’s only possible if patterns `Y` and `Z` aren’t mutually exclusive.

For example, `\d+(?=\s)(?=.*30)` looks for `\d+` that is followed by a space `(?=\s)`, and there’s `30` somewhere after it `(?=.*30)`:

[](# "run")

[](# "open in sandbox")

`let str = "1 turkey costs 30€";  alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1`

In our string that exactly matches the number `1`.

[Negative lookahead](#negative-lookahead)
-----------------------------------------

Let’s say that we want a quantity instead, not a price from the same string. That’s a number `\d+`, NOT followed by `€`.

For that, a negative lookahead can be applied.

The syntax is: `X(?!Y)`, it means "search `X`, but only if not followed by `Y`".

[](# "run")

[](# "open in sandbox")

`let str = "2 turkeys cost 60€";  alert( str.match(/\d+\b(?!€)/g) ); // 2 (the price is not matched)`

[Lookbehind](#lookbehind)
-------------------------

Lookbehind browser compatibility

Please Note: Lookbehind is not supported in non-V8 browsers, such as Safari, Internet Explorer.

Lookahead allows to add a condition for “what follows”.

Lookbehind is similar, but it looks behind. That is, it allows to match a pattern only if there’s something before it.

The syntax is:

*   Positive lookbehind: `(?<=Y)X`, matches `X`, but only if there’s `Y` before it.
*   Negative lookbehind: `(?<!Y)X`, matches `X`, but only if there’s no `Y` before it.

For example, let’s change the price to US dollars. The dollar sign is usually before the number, so to look for `$30` we’ll use `(?<=\$)\d+` – an amount preceded by `$`:

[](# "run")

[](# "open in sandbox")

`let str = "1 turkey costs $30";  // the dollar sign is escaped \$ alert( str.match(/(?<=\$)\d+/) ); // 30 (skipped the sole number)`

And, if we need the quantity – a number, not preceded by `$`, then we can use a negative lookbehind `(?<!\$)\d+`:

[](# "run")

[](# "open in sandbox")

`let str = "2 turkeys cost $60";  alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (the price is not matched)`

[Capturing groups](#capturing-groups)
-------------------------------------

Generally, the contents inside lookaround parentheses does not become a part of the result.

E.g. in the pattern `\d+(?=€)`, the `€` sign doesn’t get captured as a part of the match. That’s natural: we look for a number `\d+`, while `(?=€)` is just a test that it should be followed by `€`.

But in some situations we might want to capture the lookaround expression as well, or a part of it. That’s possible. Just wrap that part into additional parentheses.

In the example below the currency sign `(€|kr)` is captured, along with the amount:

[](# "run")

[](# "open in sandbox")

`let str = "1 turkey costs 30€"; let regexp = /\d+(?=(€|kr))/; // extra parentheses around €|kr  alert( str.match(regexp) ); // 30, €`

And here’s the same for lookbehind:

[](# "run")

[](# "open in sandbox")

`let str = "1 turkey costs $30"; let regexp = /(?<=(\$|£))\d+/;  alert( str.match(regexp) ); // 30, $`

[Summary](#summary)
-------------------

Lookahead and lookbehind (commonly referred to as “lookaround”) are useful when we’d like to match something depending on the context before/after it.

For simple regexps we can do the similar thing manually. That is: match everything, in any context, and then filter by context in the loop.

Remember, `str.match` (without flag `g`) and `str.matchAll` (always) return matches as arrays with `index` property, so we know where exactly in the text it is, and can check the context.

But generally lookaround is more convenient.

Lookaround types:

Pattern

type

matches

`X(?=Y)`

Positive lookahead

`X` if followed by `Y`

`X(?!Y)`

Negative lookahead

`X` if not followed by `Y`

`(?<=Y)X`

Positive lookbehind

`X` if after `Y`

`(?<!Y)X`

Negative lookbehind

`X` if not after `Y`
